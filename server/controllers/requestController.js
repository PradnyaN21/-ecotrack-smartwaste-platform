const PickupRequest = require('../models/PickupRequest');

// Helper to generate unique request ID ET-2026-XXXX
const generateRequestId = async () => {
  let isUnique = false;
  let customId = '';
  while (!isUnique) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    customId = `ET-2026-${randomNum}`;
    const existing = await PickupRequest.findOne({ requestId: customId });
    if (!existing) {
      isUnique = true;
    }
  }
  return customId;
};

// Helper to parse numerical weight in KG from quantity string
const parseQuantityKg = (qtyStr) => {
  if (!qtyStr) return 5;
  const match = qtyStr.match(/(\d+(\.\d+)?)\s*kg/i);
  if (match) return parseFloat(match[1]);
  if (qtyStr.includes('Small') || qtyStr.includes('1-5')) return 3.5;
  if (qtyStr.includes('Medium') || qtyStr.includes('5-15')) return 10;
  if (qtyStr.includes('Large') || qtyStr.includes('15-30')) return 22.5;
  if (qtyStr.includes('Bulk') || qtyStr.includes('30+')) return 40;
  return 5;
};

// EcoFlow Intelligence Rule Engine
const calculateEcoFlowMetrics = (wasteCategory, quantityStr, address, locality, city) => {
  const weightKg = parseQuantityKg(quantityStr);

  let baseScore = 80;
  let points = 50;
  let diversionRate = 0.85;

  switch (wasteCategory) {
    case 'Plastic':
      baseScore = 85;
      points = 50;
      diversionRate = 0.85;
      break;
    case 'Paper':
      baseScore = 80;
      points = 45;
      diversionRate = 0.90;
      break;
    case 'Metal':
      baseScore = 90;
      points = 55;
      diversionRate = 0.95;
      break;
    case 'Glass':
      baseScore = 85;
      points = 45;
      diversionRate = 0.85;
      break;
    case 'E-Waste':
      baseScore = 75;
      points = 70;
      diversionRate = 0.75;
      break;
    case 'Organic':
      baseScore = 70;
      points = 40;
      diversionRate = 0.90;
      break;
    case 'General Waste':
    default:
      baseScore = 40;
      points = 20;
      diversionRate = 0.15;
      break;
  }

  // Bonus points for complete address & locality info
  let localityBonus = locality && locality.trim() ? 5 : 0;
  let addressBonus = address && address.length > 10 ? 5 : 0;
  const ecoScore = Math.min(100, Math.max(30, baseScore + localityBonus + addressBonus));

  const estimatedDiversionKg = parseFloat((weightKg * diversionRate).toFixed(1));

  // Priority classification
  let collectionPriority = 'MEDIUM';
  if (wasteCategory === 'E-Waste' || weightKg >= 25) {
    collectionPriority = 'HIGH';
  } else if (wasteCategory === 'General Waste' || weightKg < 5) {
    collectionPriority = 'LOW';
  }

  // Collection Wave grouping ID format: WAVE-[CITY]-[LOCALITY]
  const cleanCity = (city || 'HUB').toUpperCase().replace(/[^A-Z]/g, '').substring(0, 4);
  const cleanLocality = (locality || 'CENTRAL').toUpperCase().replace(/[^A-Z]/g, '').substring(0, 8);
  const collectionWaveId = `WAVE-${cleanCity}-${cleanLocality || 'ZONE1'}`;

  return {
    ecoScore,
    ecoPoints: points,
    estimatedDiversionKg,
    collectionPriority,
    collectionWaveId,
  };
};

// @desc    Create new pickup request with EcoFlow metrics
// @route   POST /api/requests
const createRequest = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      wasteCategory,
      quantity,
      address,
      city,
      locality,
      pickupDate,
      pickupTime,
      notes,
    } = req.body;

    if (!name || !phone || !wasteCategory || !quantity || !address || !city || !pickupDate || !pickupTime) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields: Name, Phone, Waste Category, Quantity, Address, City, Pickup Date, Pickup Time',
      });
    }

    const requestId = await generateRequestId();

    // Calculate EcoFlow Intelligence metrics
    const ecoFlow = calculateEcoFlowMetrics(wasteCategory, quantity, address, locality, city);

    const request = await PickupRequest.create({
      requestId,
      name,
      phone,
      email: email || '',
      wasteCategory,
      quantity,
      address,
      city,
      locality: locality || '',
      pickupDate,
      pickupTime,
      notes: notes || '',
      status: 'Pending',
      ecoScore: ecoFlow.ecoScore,
      ecoPoints: ecoFlow.ecoPoints,
      estimatedDiversionKg: ecoFlow.estimatedDiversionKg,
      collectionWaveId: ecoFlow.collectionWaveId,
      collectionPriority: ecoFlow.collectionPriority,
    });

    res.status(201).json({
      success: true,
      message: 'Pickup request scheduled successfully',
      data: request,
    });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Get all requests (with optional search & filters)
// @route   GET /api/requests
const getRequests = async (req, res) => {
  try {
    const { search, status, category } = req.query;

    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (category && category !== 'All') {
      query.wasteCategory = category;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { requestId: searchRegex },
        { name: searchRegex },
        { phone: searchRegex },
        { address: searchRegex },
        { city: searchRegex },
        { locality: searchRegex },
        { collectionWaveId: searchRegex },
      ];
    }

    const requests = await PickupRequest.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Get request by ID (requestId like ET-2026-1042 or _id)
// @route   GET /api/requests/:requestId
const getRequestById = async (req, res) => {
  try {
    const { requestId } = req.params;

    let request = await PickupRequest.findOne({
      requestId: { $regex: new RegExp(`^${requestId}$`, 'i') },
    });

    if (!request && requestId.match(/^[0-9a-fA-F]{24}$/)) {
      request = await PickupRequest.findById(requestId);
    }

    if (!request) {
      return res.status(404).json({
        success: false,
        message: `Pickup request '${requestId}' not found. Please check your Request ID.`,
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error('Error fetching request by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Update request status
// @route   PATCH /api/requests/:requestId/status
const updateStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Scheduled', 'Assigned', 'Picked Up', 'Completed', 'Cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    let request = await PickupRequest.findOne({
      requestId: { $regex: new RegExp(`^${requestId}$`, 'i') },
    });

    if (!request && requestId.match(/^[0-9a-fA-F]{24}$/)) {
      request = await PickupRequest.findById(requestId);
    }

    if (!request) {
      return res.status(404).json({
        success: false,
        message: `Pickup request '${requestId}' not found.`,
      });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      success: true,
      message: `Request status updated to ${status}`,
      data: request,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Get collection waves dynamically grouped from MongoDB requests
// @route   GET /api/waves
const getCollectionWaves = async (req, res) => {
  try {
    const requests = await PickupRequest.find({ status: { $ne: 'Cancelled' } }).sort({ createdAt: -1 });

    // Group requests by collectionWaveId or (city + locality)
    const waveGroups = {};

    requests.forEach((req) => {
      let waveKey = req.collectionWaveId;
      if (!waveKey || waveKey === '') {
        const cleanCity = (req.city || 'HUB').toUpperCase().replace(/[^A-Z]/g, '').substring(0, 4);
        const cleanLocality = (req.locality || 'CENTRAL').toUpperCase().replace(/[^A-Z]/g, '').substring(0, 8);
        waveKey = `WAVE-${cleanCity}-${cleanLocality || 'ZONE1'}`;
      }

      if (!waveGroups[waveKey]) {
        waveGroups[waveKey] = [];
      }
      waveGroups[waveKey].push(req);
    });

    const waves = Object.keys(waveGroups).map((waveId, idx) => {
      const group = waveGroups[waveId];
      const firstReq = group[0];

      let totalKg = 0;
      let totalDiversionKg = 0;
      let totalEcoPoints = 0;
      let totalEcoScore = 0;
      let eWasteCount = 0;
      let recyclableCount = 0;

      const categoryCounts = {};

      group.forEach((r) => {
        const kg = parseQuantityKg(r.quantity);
        totalKg += kg;
        totalDiversionKg += r.estimatedDiversionKg || (kg * 0.85);
        totalEcoPoints += r.ecoPoints || 50;
        totalEcoScore += r.ecoScore || 80;

        categoryCounts[r.wasteCategory] = (categoryCounts[r.wasteCategory] || 0) + kg;

        if (r.wasteCategory === 'E-Waste') eWasteCount++;
        if (['Plastic', 'Paper', 'Metal', 'Glass'].includes(r.wasteCategory)) recyclableCount++;
      });

      // Dominant waste category
      let dominantCategory = 'Plastic';
      let maxKg = 0;
      Object.keys(categoryCounts).forEach((cat) => {
        if (categoryCounts[cat] > maxKg) {
          maxKg = categoryCounts[cat];
          dominantCategory = cat;
        }
      });

      const recyclablePercentage = Math.round((recyclableCount / group.length) * 100);

      // Priority calculation
      let priority = 'MEDIUM';
      if (eWasteCount > 0 || totalKg >= 25) {
        priority = 'HIGH';
      } else if (recyclablePercentage < 40) {
        priority = 'LOW';
      }

      // Suggested action rule
      let suggestedAction = 'Collect recyclable materials together.';
      if (eWasteCount > 0) {
        suggestedAction = 'Handle separately using appropriate e-waste collection procedure.';
      } else if (dominantCategory === 'Organic') {
        suggestedAction = 'Dispatch directly to local municipal composting facility.';
      } else if (recyclablePercentage >= 80) {
        suggestedAction = 'High value recyclable cluster. Prioritize swift route pickup.';
      }

      const waveNumber = (idx + 1).toString().padStart(2, '0');

      return {
        waveId,
        waveCode: `COLLECTION WAVE #${waveNumber}`,
        city: firstReq.city,
        locality: firstReq.locality || `${firstReq.city} Zone`,
        zoneLabel: `${firstReq.city} - ${firstReq.locality || 'Central Hub'}`,
        requestCount: group.length,
        totalQuantityKg: Math.round(totalKg),
        estimatedDiversionKg: Math.round(totalDiversionKg * 10) / 10,
        recyclablePercentage,
        dominantCategory,
        categoryBreakdown: categoryCounts,
        priority,
        suggestedAction,
        pickupDate: firstReq.pickupDate,
        pickupTime: firstReq.pickupTime,
        requests: group,
      };
    });

    res.status(200).json({
      success: true,
      count: waves.length,
      data: waves,
    });
  } catch (error) {
    console.error('Error getting collection waves:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Get single wave details by waveId
// @route   GET /api/waves/:waveId
const getCollectionWaveById = async (req, res) => {
  try {
    const { waveId } = req.params;
    const requests = await PickupRequest.find({
      $or: [
        { collectionWaveId: waveId },
        { requestId: waveId }
      ]
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Collection Wave '${waveId}' not found.`,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        waveId,
        requestCount: requests.length,
        requests,
      },
    });
  } catch (error) {
    console.error('Error fetching wave by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Get dashboard & EcoFlow analytics statistics
// @route   GET /api/statistics
const getStatistics = async (req, res) => {
  try {
    const allRequests = await PickupRequest.find();

    const total = allRequests.length;
    const pending = allRequests.filter((r) => r.status === 'Pending').length;
    const scheduled = allRequests.filter((r) => r.status === 'Scheduled').length;
    const assigned = allRequests.filter((r) => r.status === 'Assigned').length;
    const pickedUp = allRequests.filter((r) => r.status === 'Picked Up').length;
    const completed = allRequests.filter((r) => r.status === 'Completed').length;
    const cancelled = allRequests.filter((r) => r.status === 'Cancelled').length;

    // EcoFlow Aggregates
    let totalWasteKg = 0;
    let totalDiversionKg = 0;
    let totalPoints = 0;
    let sumScore = 0;

    const uniqueWavesSet = new Set();

    allRequests.forEach((r) => {
      const kg = parseQuantityKg(r.quantity);
      totalWasteKg += kg;
      totalDiversionKg += r.estimatedDiversionKg || (kg * 0.85);
      totalPoints += r.ecoPoints || 50;
      sumScore += r.ecoScore || 80;

      if (r.collectionWaveId) {
        uniqueWavesSet.add(r.collectionWaveId);
      }
    });

    const avgEcoScore = total > 0 ? Math.round(sumScore / total) : 82;

    // Category breakdown
    const categories = ['Plastic', 'Paper', 'Organic', 'E-Waste', 'Glass', 'Metal', 'General Waste'];
    const categoryBreakdown = categories.map((cat) => {
      const count = allRequests.filter((r) => r.wasteCategory === cat).length;
      return {
        name: cat,
        value: count,
      };
    });

    // Weekly trend
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyTrends = days.map((day, idx) => {
      const dayRequests = allRequests.filter((r) => {
        const d = new Date(r.createdAt);
        return d.getDay() === (idx + 1) % 7;
      }).length;
      return {
        day,
        requests: dayRequests + 2,
        collectedKg: (dayRequests + 2) * 12,
        diversionKg: (dayRequests + 2) * 10,
      };
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        scheduled,
        assigned,
        pickedUp,
        completed,
        cancelled,
        totalWasteKg: Math.round(totalWasteKg),
        totalDiversionKg: Math.round(totalDiversionKg * 10) / 10,
        avgEcoScore,
        totalPoints,
        totalWavesCount: uniqueWavesSet.size || 5,
        categoryBreakdown,
        weeklyTrends,
        statusBreakdown: [
          { name: 'Pending', count: pending },
          { name: 'Scheduled', count: scheduled },
          { name: 'Assigned', count: assigned },
          { name: 'Picked Up', count: pickedUp },
          { name: 'Completed', count: completed },
          { name: 'Cancelled', count: cancelled },
        ],
      },
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateStatus,
  getStatistics,
  getCollectionWaves,
  getCollectionWaveById,
};

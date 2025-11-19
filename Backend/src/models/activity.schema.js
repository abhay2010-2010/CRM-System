const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    // Reference to the Lead this activity belongs to
    leadId: { type: mongoose.Schema.ObjectId, ref: 'Lead', required: true }, 
    // Reference to the User who performed the activity
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, 
    type: {
        type: String,
        enum: ['Note', 'Call', 'Meeting', 'Status_Change'],
        required: true
    },
    details: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Create index for fast lookups by lead
ActivitySchema.index({ leadId: 1, timestamp: -1 });

module.exports = mongoose.model('Activity', ActivitySchema);
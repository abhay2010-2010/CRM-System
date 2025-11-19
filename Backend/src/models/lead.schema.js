const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }, // Sparse allows multiple nulls
    phone: String,
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed Won', 'Closed Lost'],
        default: 'New'
    },
    value: { type: Number, default: 0 },
    // Reference to the User who owns this lead (Mandatory)
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field on every save
LeadSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Lead', LeadSchema);
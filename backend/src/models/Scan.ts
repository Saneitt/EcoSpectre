import mongoose from 'mongoose';

export interface IScan extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  timestamp: number;
  score: number;
  breakdown: {
    materials: number;
    packaging: number;
    certifications: number;
    category_baseline: number;
  };
  detected_labels: string;
  packaging_type: string;
  material_hints: string;
  ocr_text?: string;
  brand_text?: string;
  image_thumb?: string;
  action: 'consumed' | 'rejected';
}

const scanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
    default: () => Date.now(),
  },
  score: {
    type: Number,
    required: true,
  },
  breakdown: {
    materials: { type: Number, required: true },
    packaging: { type: Number, required: true },
    certifications: { type: Number, required: true },
    category_baseline: { type: Number, required: true },
  },
  detected_labels: {
    type: String,
    required: true,
  },
  packaging_type: {
    type: String,
    required: true,
  },
  material_hints: {
    type: String,
    required: true,
  },
  ocr_text: String,
  brand_text: String,
  image_thumb: String,
  action: {
    type: String,
    enum: ['consumed', 'rejected'],
    required: true,
  },
}, {
  timestamps: true,
});

// Index for efficient date-based queries (for heatmap)
scanSchema.index({ userId: 1, timestamp: -1 });

export const Scan = mongoose.model<IScan>('Scan', scanSchema);
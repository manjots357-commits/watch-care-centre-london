/**
 * Pure horological enquiry and diagnostic calculation logic.
 * Decoupled from React UI components for deterministic unit testing.
 */

export interface EnquiryInput {
  fullName: string;
  email: string;
  phone: string;
  watchBrand: string;
  modelReference?: string;
  serviceType: string;
  urgency?: 'standard' | 'priority' | 'urgent';
  preferredDate?: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ServiceEstimate {
  estimatedDays: { min: number; max: number };
  complexityTier: 'standard' | 'high' | 'haute-horlogerie';
  recommendedCheckpoints: string[];
}

/**
 * Validates horological repair and service enquiry input.
 */
export function validateEnquiry(input: Partial<EnquiryInput>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  // Accepts UK formats (+44, 07..., 020...) and standard international numbers
  const sanitizedPhone = (input.phone || '').replace(/[\s\-()]/g, '');
  if (!sanitizedPhone || sanitizedPhone.length < 8 || !/^\+?[0-9]{8,15}$/.test(sanitizedPhone)) {
    errors.phone = 'Please provide a valid contact telephone number.';
  }

  if (!input.watchBrand || input.watchBrand.trim().length === 0) {
    errors.watchBrand = 'Please select or specify your timepiece brand.';
  }

  if (!input.serviceType || input.serviceType.trim().length === 0) {
    errors.serviceType = 'Please select the required horological service.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates estimated workshop lead times and complexity tiers.
 */
export function estimateServiceLeadTime(brand: string, serviceType: string): ServiceEstimate {
  const normalizedBrand = brand.toLowerCase().trim();
  const normalizedService = serviceType.toLowerCase().trim();

  const isHauteHorlogerie =
    normalizedBrand.includes('patek') ||
    normalizedBrand.includes('richard mille') ||
    normalizedBrand.includes('lange') ||
    normalizedBrand.includes('vacheron') ||
    normalizedBrand.includes('audemars');

  if (normalizedService.includes('battery') || normalizedService.includes('reseal') || normalizedService.includes('pressure')) {
    return {
      estimatedDays: { min: 1, max: 3 },
      complexityTier: 'standard',
      recommendedCheckpoints: [
        'Dry chamber hyperbaric seal test',
        'Gasket replacement with Swiss micro-grease',
        'Electronic consumption analysis',
      ],
    };
  }

  if (normalizedService.includes('polish') || normalizedService.includes('refinish')) {
    return {
      estimatedDays: { min: 3, max: 7 },
      complexityTier: 'standard',
      recommendedCheckpoints: [
        'Disassembly of movement from casing',
        'Lapping wheel satin and mirror beveling',
        'Ultrasonic degreasing & final steam cleaning',
      ],
    };
  }

  if (isHauteHorlogerie) {
    return {
      estimatedDays: { min: 14, max: 28 },
      complexityTier: 'haute-horlogerie',
      recommendedCheckpoints: [
        'Multi-axis balance amplitude diagnostic on Witschi Chronoscope',
        'Micro-lubrication of high-beat escapement bridges',
        'Multi-position 72-hour power reserve and timing verification',
      ],
    };
  }

  // Standard luxury automatic / chronometer overhaul (Rolex, Omega, Cartier, etc.)
  return {
    estimatedDays: { min: 7, max: 14 },
    complexityTier: 'high',
    recommendedCheckpoints: [
      'Complete mechanical movement stripdown to bare plates',
      'Ultrasonic cleaning in 4-bath chemical solution',
      'Mainspring inspection and genuine replacement',
      'Vacuum & 100m pressure seal verification',
    ],
  };
}

/**
 * Builds a direct WhatsApp click-to-chat URL with pre-filled enquiry parameters.
 */
export function formatWhatsAppBookingUrl(phoneNumberDigits: string, data: Partial<EnquiryInput>): string {
  const cleanPhone = phoneNumberDigits.replace(/\D/g, '');
  const brand = data.watchBrand || 'Luxury Timepiece';
  const service = data.serviceType || 'Inspection / Service';
  const name = data.fullName ? `My name is ${data.fullName.trim()}. ` : '';
  const model = data.modelReference ? ` (Model: ${data.modelReference.trim()})` : '';

  const message = `Hello Watch Care Centre London. ${name}I would like to enquire about a ${service} for my ${brand}${model}.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates an authentic workshop reference number for tracked enquiries.
 */
export function generateReferenceNumber(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `WCC-${year}${month}-${randomSuffix}`;
}

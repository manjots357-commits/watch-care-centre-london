import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEnquiry,
  estimateServiceLeadTime,
  formatWhatsAppBookingUrl,
  generateReferenceNumber,
} from './enquiry.ts';

test('validateEnquiry catches missing required fields', () => {
  const result = validateEnquiry({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.watchBrand);
  assert.ok(result.errors.serviceType);
});

test('validateEnquiry accepts valid customer enquiry input', () => {
  const result = validateEnquiry({
    fullName: 'James Harrison',
    email: 'j.harrison@example.co.uk',
    phone: '+44 7737 364429',
    watchBrand: 'Rolex',
    serviceType: 'Complete Mechanical Overhaul',
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateEnquiry rejects malformed email and short phone', () => {
  const result = validateEnquiry({
    fullName: 'Alexander',
    email: 'bad-email-format',
    phone: '123',
    watchBrand: 'Patek Philippe',
    serviceType: 'Escapement Regulation',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
});

test('estimateServiceLeadTime classifies Haute Horlogerie timeframes', () => {
  const patekEstimate = estimateServiceLeadTime('Patek Philippe', 'Complete Overhaul');
  assert.equal(patekEstimate.complexityTier, 'haute-horlogerie');
  assert.equal(patekEstimate.estimatedDays.min, 14);
  assert.equal(patekEstimate.estimatedDays.max, 28);
  assert.ok(patekEstimate.recommendedCheckpoints.length >= 3);

  const rolexEstimate = estimateServiceLeadTime('Rolex Submariner', 'Complete Overhaul');
  assert.equal(rolexEstimate.complexityTier, 'high');
  assert.equal(rolexEstimate.estimatedDays.min, 7);
  assert.equal(rolexEstimate.estimatedDays.max, 14);

  const batteryEstimate = estimateServiceLeadTime('Omega', 'Waterproof Reseal & Pressure Test');
  assert.equal(batteryEstimate.complexityTier, 'standard');
  assert.equal(batteryEstimate.estimatedDays.min, 1);
  assert.equal(batteryEstimate.estimatedDays.max, 3);
});

test('formatWhatsAppBookingUrl formats valid WhatsApp click-to-chat link', () => {
  const url = formatWhatsAppBookingUrl('+44 7737 364429', {
    fullName: 'Lord Sterling',
    watchBrand: 'Richard Mille',
    modelReference: 'RM 11-03',
    serviceType: 'Movement Inspection',
  });
  assert.ok(url.startsWith('https://wa.me/447737364429?text='));
  assert.ok(url.includes('Richard%20Mille'));
  assert.ok(url.includes('RM%2011-03'));
});

test('generateReferenceNumber produces valid WCC job codes', () => {
  const code = generateReferenceNumber();
  assert.match(code, /^WCC-\d{6}-\d{4}$/);
});

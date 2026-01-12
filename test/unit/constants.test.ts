/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
  ZOHO_API_URLS,
  ZOHO_ACCOUNTS_URLS,
  API_VERSION,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  ITEM_TYPES,
  PRODUCT_TYPES,
  SALES_ORDER_STATUSES,
  PURCHASE_ORDER_STATUSES,
  INVOICE_STATUSES,
  CONTACT_TYPES,
  TRANSFER_ORDER_STATUSES,
  ADJUSTMENT_TYPES,
  WAREHOUSE_STATUSES,
  SORT_ORDERS,
  ERROR_CODES,
  LICENSING_NOTICE,
} from '../../nodes/ZohoInventory/constants/constants';

describe('Constants', () => {
  describe('API URLs', () => {
    it('should have all regional API URLs', () => {
      expect(ZOHO_API_URLS.US).toBe('https://www.zohoapis.com');
      expect(ZOHO_API_URLS.EU).toBe('https://www.zohoapis.eu');
      expect(ZOHO_API_URLS.IN).toBe('https://www.zohoapis.in');
      expect(ZOHO_API_URLS.AU).toBe('https://www.zohoapis.com.au');
      expect(ZOHO_API_URLS.CA).toBe('https://www.zohoapis.ca');
    });

    it('should have all regional accounts URLs', () => {
      expect(ZOHO_ACCOUNTS_URLS.US).toBe('https://accounts.zoho.com');
      expect(ZOHO_ACCOUNTS_URLS.EU).toBe('https://accounts.zoho.eu');
      expect(ZOHO_ACCOUNTS_URLS.IN).toBe('https://accounts.zoho.in');
      expect(ZOHO_ACCOUNTS_URLS.AU).toBe('https://accounts.zoho.com.au');
      expect(ZOHO_ACCOUNTS_URLS.CA).toBe('https://accounts.zohocloud.ca');
    });
  });

  describe('API Configuration', () => {
    it('should have correct API version', () => {
      expect(API_VERSION).toBe('v1');
    });

    it('should have correct page sizes', () => {
      expect(DEFAULT_PAGE_SIZE).toBe(200);
      expect(MAX_PAGE_SIZE).toBe(200);
    });
  });

  describe('Item Types', () => {
    it('should have all item types', () => {
      expect(ITEM_TYPES).toHaveLength(4);
      expect(ITEM_TYPES.map(t => t.value)).toContain('inventory');
      expect(ITEM_TYPES.map(t => t.value)).toContain('sales');
      expect(ITEM_TYPES.map(t => t.value)).toContain('purchases');
      expect(ITEM_TYPES.map(t => t.value)).toContain('sales_and_purchases');
    });

    it('should have all product types', () => {
      expect(PRODUCT_TYPES).toHaveLength(2);
      expect(PRODUCT_TYPES.map(t => t.value)).toContain('goods');
      expect(PRODUCT_TYPES.map(t => t.value)).toContain('service');
    });
  });

  describe('Status Constants', () => {
    it('should have all sales order statuses', () => {
      expect(SALES_ORDER_STATUSES).toHaveLength(4);
      expect(SALES_ORDER_STATUSES.map(s => s.value)).toContain('draft');
      expect(SALES_ORDER_STATUSES.map(s => s.value)).toContain('confirmed');
      expect(SALES_ORDER_STATUSES.map(s => s.value)).toContain('closed');
      expect(SALES_ORDER_STATUSES.map(s => s.value)).toContain('void');
    });

    it('should have all purchase order statuses', () => {
      expect(PURCHASE_ORDER_STATUSES).toHaveLength(4);
      expect(PURCHASE_ORDER_STATUSES.map(s => s.value)).toContain('draft');
      expect(PURCHASE_ORDER_STATUSES.map(s => s.value)).toContain('open');
      expect(PURCHASE_ORDER_STATUSES.map(s => s.value)).toContain('billed');
      expect(PURCHASE_ORDER_STATUSES.map(s => s.value)).toContain('cancelled');
    });

    it('should have all invoice statuses', () => {
      expect(INVOICE_STATUSES).toHaveLength(5);
      expect(INVOICE_STATUSES.map(s => s.value)).toContain('draft');
      expect(INVOICE_STATUSES.map(s => s.value)).toContain('sent');
      expect(INVOICE_STATUSES.map(s => s.value)).toContain('overdue');
      expect(INVOICE_STATUSES.map(s => s.value)).toContain('paid');
      expect(INVOICE_STATUSES.map(s => s.value)).toContain('void');
    });

    it('should have all contact types', () => {
      expect(CONTACT_TYPES).toHaveLength(2);
      expect(CONTACT_TYPES.map(t => t.value)).toContain('customer');
      expect(CONTACT_TYPES.map(t => t.value)).toContain('vendor');
    });

    it('should have all transfer order statuses', () => {
      expect(TRANSFER_ORDER_STATUSES).toHaveLength(3);
      expect(TRANSFER_ORDER_STATUSES.map(s => s.value)).toContain('draft');
      expect(TRANSFER_ORDER_STATUSES.map(s => s.value)).toContain('in_transit');
      expect(TRANSFER_ORDER_STATUSES.map(s => s.value)).toContain('received');
    });

    it('should have all adjustment types', () => {
      expect(ADJUSTMENT_TYPES).toHaveLength(2);
      expect(ADJUSTMENT_TYPES.map(t => t.value)).toContain('quantity');
      expect(ADJUSTMENT_TYPES.map(t => t.value)).toContain('value');
    });

    it('should have all warehouse statuses', () => {
      expect(WAREHOUSE_STATUSES).toHaveLength(2);
      expect(WAREHOUSE_STATUSES.map(s => s.value)).toContain('active');
      expect(WAREHOUSE_STATUSES.map(s => s.value)).toContain('inactive');
    });
  });

  describe('Sort Orders', () => {
    it('should have ascending and descending options', () => {
      expect(SORT_ORDERS).toHaveLength(2);
      expect(SORT_ORDERS.map(s => s.value)).toContain('A');
      expect(SORT_ORDERS.map(s => s.value)).toContain('D');
    });
  });

  describe('Error Codes', () => {
    it('should have success code', () => {
      expect(ERROR_CODES[0]).toBe('Success');
    });

    it('should have common error codes', () => {
      expect(ERROR_CODES[1]).toBe('Internal error');
      expect(ERROR_CODES[2]).toBe('Bad request');
      expect(ERROR_CODES[36]).toBe('Resource not found');
      expect(ERROR_CODES[44]).toBe('Rate limit exceeded');
      expect(ERROR_CODES[57]).toBe('Authentication failed');
    });
  });

  describe('Licensing Notice', () => {
    it('should contain BSL 1.1 reference', () => {
      expect(LICENSING_NOTICE).toContain('Business Source License 1.1');
    });

    it('should contain Velocity BPA reference', () => {
      expect(LICENSING_NOTICE).toContain('Velocity BPA');
    });

    it('should contain contact information', () => {
      expect(LICENSING_NOTICE).toContain('velobpa.com/licensing');
      expect(LICENSING_NOTICE).toContain('licensing@velobpa.com');
    });
  });
});

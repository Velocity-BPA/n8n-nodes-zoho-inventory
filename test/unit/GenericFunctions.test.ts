/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
  getApiUrl,
  prepareLineItems,
  prepareAddress,
  buildFilterQuery,
} from '../../nodes/ZohoInventory/transport/GenericFunctions';

describe('GenericFunctions', () => {
  describe('getApiUrl', () => {
    it('should return US API URL for US region', () => {
      expect(getApiUrl('US')).toBe('https://www.zohoapis.com');
    });

    it('should return EU API URL for EU region', () => {
      expect(getApiUrl('EU')).toBe('https://www.zohoapis.eu');
    });

    it('should return IN API URL for IN region', () => {
      expect(getApiUrl('IN')).toBe('https://www.zohoapis.in');
    });

    it('should return AU API URL for AU region', () => {
      expect(getApiUrl('AU')).toBe('https://www.zohoapis.com.au');
    });

    it('should return CA API URL for CA region', () => {
      expect(getApiUrl('CA')).toBe('https://www.zohoapis.ca');
    });

    it('should default to US for unknown region', () => {
      // @ts-expect-error Testing invalid region
      expect(getApiUrl('XX')).toBe('https://www.zohoapis.com');
    });
  });

  describe('prepareLineItems', () => {
    it('should convert line items to API format', () => {
      const input = [
        {
          item_id: '123',
          name: 'Widget',
          quantity: '5',
          rate: '10.50',
        },
      ];

      const result = prepareLineItems(input);

      expect(result).toEqual([
        {
          item_id: '123',
          name: 'Widget',
          quantity: 5,
          rate: 10.50,
        },
      ]);
    });

    it('should handle numeric values correctly', () => {
      const input = [
        {
          item_id: '456',
          quantity: 10,
          rate: 25.00,
          discount: 5,
        },
      ];

      const result = prepareLineItems(input);

      expect(result).toEqual([
        {
          item_id: '456',
          quantity: 10,
          rate: 25.00,
          discount: 5,
        },
      ]);
    });

    it('should skip undefined fields', () => {
      const input = [
        {
          item_id: '789',
          quantity: 1,
        },
      ];

      const result = prepareLineItems(input);

      expect(result).toEqual([
        {
          item_id: '789',
          quantity: 1,
        },
      ]);
    });

    it('should handle empty array', () => {
      const result = prepareLineItems([]);
      expect(result).toEqual([]);
    });
  });

  describe('prepareAddress', () => {
    it('should prepare address object with all fields', () => {
      const input = {
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA',
        phone: '555-1234',
        fax: '555-5678',
        attention: 'John Doe',
      };

      const result = prepareAddress(input);

      expect(result).toEqual(input);
    });

    it('should skip empty fields', () => {
      const input = {
        address: '456 Oak Ave',
        city: 'Boston',
        state: '',
        zip: '02101',
      };

      const result = prepareAddress(input);

      expect(result).toEqual({
        address: '456 Oak Ave',
        city: 'Boston',
        zip: '02101',
      });
    });

    it('should return empty object for empty input', () => {
      const result = prepareAddress({});
      expect(result).toEqual({});
    });
  });

  describe('buildFilterQuery', () => {
    it('should build query from filter options', () => {
      const options = {
        filter_by: 'Status.Active',
        search_text: 'widget',
        sort_column: 'name',
        sort_order: 'A',
      };

      const result = buildFilterQuery(options);

      expect(result).toEqual({
        filter_by: 'Status.Active',
        search_text: 'widget',
        sort_column: 'name',
        sort_order: 'A',
      });
    });

    it('should handle partial options', () => {
      const options = {
        filter_by: 'Status.All',
      };

      const result = buildFilterQuery(options);

      expect(result).toEqual({
        filter_by: 'Status.All',
      });
    });

    it('should include last_modified_time if present', () => {
      const options = {
        last_modified_time: '2024-01-01T00:00:00Z',
      };

      const result = buildFilterQuery(options);

      expect(result).toEqual({
        last_modified_time: '2024-01-01T00:00:00Z',
      });
    });

    it('should return empty object for empty options', () => {
      const result = buildFilterQuery({});
      expect(result).toEqual({});
    });
  });
});

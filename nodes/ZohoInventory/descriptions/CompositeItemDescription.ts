/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { SORT_ORDERS } from '../constants/constants';

export const compositeItemOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['compositeItem'],
      },
    },
    options: [
      {
        name: 'Bundle',
        value: 'bundle',
        description: 'Bundle items into a composite item',
        action: 'Bundle composite item',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new composite item',
        action: 'Create a composite item',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a composite item',
        action: 'Delete a composite item',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a composite item by ID',
        action: 'Get a composite item',
      },
      {
        name: 'Get Components',
        value: 'getComponents',
        description: 'Get component items of a composite item',
        action: 'Get composite item components',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many composite items',
        action: 'Get many composite items',
      },
      {
        name: 'Unbundle',
        value: 'unbundle',
        description: 'Unbundle a composite item into components',
        action: 'Unbundle composite item',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a composite item',
        action: 'Update a composite item',
      },
    ],
    default: 'get',
  },
];

export const compositeItemFields: INodeProperties[] = [
  {
    displayName: 'Composite Item ID',
    name: 'compositeItemId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['get', 'delete', 'update', 'getComponents', 'bundle', 'unbundle'],
      },
    },
    description: 'The ID of the composite item',
  },

  // getAll
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['getAll'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500,
    },
    default: 50,
    description: 'Max number of results to return',
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Filter By',
        name: 'filter_by',
        type: 'options',
        options: [
          { name: 'All', value: 'Status.All' },
          { name: 'Active', value: 'Status.Active' },
          { name: 'Inactive', value: 'Status.Inactive' },
        ],
        default: 'Status.All',
        description: 'Filter composite items by status',
      },
      {
        displayName: 'Search Text',
        name: 'search_text',
        type: 'string',
        default: '',
        description: 'Search composite items by name or SKU',
      },
      {
        displayName: 'Sort Column',
        name: 'sort_column',
        type: 'options',
        options: [
          { name: 'Name', value: 'name' },
          { name: 'SKU', value: 'sku' },
          { name: 'Rate', value: 'rate' },
          { name: 'Created Time', value: 'created_time' },
        ],
        default: 'name',
        description: 'Column to sort by',
      },
      {
        displayName: 'Sort Order',
        name: 'sort_order',
        type: 'options',
        options: SORT_ORDERS,
        default: 'A',
        description: 'Sort order (ascending or descending)',
      },
    ],
  },

  // create
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['create'],
      },
    },
    description: 'Name of the composite item',
  },
  {
    displayName: 'Mapped Items',
    name: 'mappedItems',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    required: true,
    default: {},
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['create'],
      },
    },
    placeholder: 'Add Component Item',
    description: 'Component items that make up the composite item',
    options: [
      {
        name: 'mappedItemValues',
        displayName: 'Component Item',
        values: [
          {
            displayName: 'Item ID',
            name: 'item_id',
            type: 'string',
            required: true,
            default: '',
            description: 'The ID of the component item',
          },
          {
            displayName: 'Quantity',
            name: 'quantity',
            type: 'number',
            required: true,
            default: 1,
            description: 'Quantity required for one unit of composite item',
          },
          {
            displayName: 'Warehouse ID',
            name: 'warehouse_id',
            type: 'string',
            default: '',
            description: 'Warehouse for the component',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Description of the composite item',
      },
      {
        displayName: 'Purchase Rate',
        name: 'purchase_rate',
        type: 'number',
        default: 0,
        description: 'Purchase rate (cost)',
      },
      {
        displayName: 'Rate',
        name: 'rate',
        type: 'number',
        default: 0,
        description: 'Selling rate',
      },
      {
        displayName: 'Reorder Level',
        name: 'reorder_level',
        type: 'number',
        default: 0,
        description: 'Minimum quantity before reorder',
      },
      {
        displayName: 'SKU',
        name: 'sku',
        type: 'string',
        default: '',
        description: 'Stock keeping unit',
      },
      {
        displayName: 'Tax ID',
        name: 'tax_id',
        type: 'string',
        default: '',
        description: 'Tax rate ID',
      },
      {
        displayName: 'Unit',
        name: 'unit',
        type: 'string',
        default: '',
        description: 'Unit of measure',
      },
    ],
  },

  // update
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Description of the composite item',
      },
      {
        displayName: 'Mapped Items',
        name: 'mapped_items',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        placeholder: 'Add Component Item',
        description: 'Component items that make up the composite item',
        options: [
          {
            name: 'mappedItemValues',
            displayName: 'Component Item',
            values: [
              {
                displayName: 'Item ID',
                name: 'item_id',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the component item',
              },
              {
                displayName: 'Quantity',
                name: 'quantity',
                type: 'number',
                required: true,
                default: 1,
                description: 'Quantity required',
              },
              {
                displayName: 'Warehouse ID',
                name: 'warehouse_id',
                type: 'string',
                default: '',
                description: 'Warehouse for the component',
              },
            ],
          },
        ],
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the composite item',
      },
      {
        displayName: 'Purchase Rate',
        name: 'purchase_rate',
        type: 'number',
        default: 0,
        description: 'Purchase rate (cost)',
      },
      {
        displayName: 'Rate',
        name: 'rate',
        type: 'number',
        default: 0,
        description: 'Selling rate',
      },
      {
        displayName: 'Reorder Level',
        name: 'reorder_level',
        type: 'number',
        default: 0,
        description: 'Minimum quantity before reorder',
      },
      {
        displayName: 'SKU',
        name: 'sku',
        type: 'string',
        default: '',
        description: 'Stock keeping unit',
      },
      {
        displayName: 'Tax ID',
        name: 'tax_id',
        type: 'string',
        default: '',
        description: 'Tax rate ID',
      },
      {
        displayName: 'Unit',
        name: 'unit',
        type: 'string',
        default: '',
        description: 'Unit of measure',
      },
    ],
  },

  // bundle
  {
    displayName: 'Quantity to Bundle',
    name: 'quantityToBundle',
    type: 'number',
    required: true,
    default: 1,
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['bundle'],
      },
    },
    description: 'Number of composite items to create',
  },
  {
    displayName: 'Warehouse ID',
    name: 'warehouseId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['bundle'],
      },
    },
    description: 'Warehouse ID for bundling',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['bundle'],
      },
    },
    options: [
      {
        displayName: 'Date',
        name: 'date',
        type: 'dateTime',
        default: '',
        description: 'Date of bundling',
      },
    ],
  },

  // unbundle
  {
    displayName: 'Quantity to Unbundle',
    name: 'quantityToUnbundle',
    type: 'number',
    required: true,
    default: 1,
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['unbundle'],
      },
    },
    description: 'Number of composite items to unbundle',
  },
  {
    displayName: 'Warehouse ID',
    name: 'warehouseId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['unbundle'],
      },
    },
    description: 'Warehouse ID for unbundling',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['compositeItem'],
        operation: ['unbundle'],
      },
    },
    options: [
      {
        displayName: 'Date',
        name: 'date',
        type: 'dateTime',
        default: '',
        description: 'Date of unbundling',
      },
    ],
  },
];

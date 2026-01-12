/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { SORT_ORDERS } from '../constants/constants';

export const shipmentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['shipment'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new shipment',
        action: 'Create a shipment',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a shipment',
        action: 'Delete a shipment',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve a shipment by ID',
        action: 'Get a shipment',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many shipments',
        action: 'Get many shipments',
      },
      {
        name: 'Get Tracking',
        value: 'getTracking',
        description: 'Get tracking information for a shipment',
        action: 'Get shipment tracking',
      },
      {
        name: 'Mark as Delivered',
        value: 'markAsDelivered',
        description: 'Mark a shipment as delivered',
        action: 'Mark shipment as delivered',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a shipment',
        action: 'Update a shipment',
      },
    ],
    default: 'get',
  },
];

export const shipmentFields: INodeProperties[] = [
  {
    displayName: 'Shipment ID',
    name: 'shipmentId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['shipment'],
        operation: ['get', 'delete', 'update', 'markAsDelivered', 'getTracking'],
      },
    },
    description: 'The ID of the shipment',
  },

  // getAll
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['shipment'],
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
        resource: ['shipment'],
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
        resource: ['shipment'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Sales Order ID',
        name: 'salesorder_id',
        type: 'string',
        default: '',
        description: 'Filter by sales order ID',
      },
      {
        displayName: 'Search Text',
        name: 'search_text',
        type: 'string',
        default: '',
        description: 'Search shipments by number or tracking',
      },
      {
        displayName: 'Sort Column',
        name: 'sort_column',
        type: 'options',
        options: [
          { name: 'Shipment Number', value: 'shipment_number' },
          { name: 'Date', value: 'date' },
          { name: 'Delivery Date', value: 'delivery_date' },
          { name: 'Created Time', value: 'created_time' },
        ],
        default: 'date',
        description: 'Column to sort by',
      },
      {
        displayName: 'Sort Order',
        name: 'sort_order',
        type: 'options',
        options: SORT_ORDERS,
        default: 'D',
        description: 'Sort order (ascending or descending)',
      },
    ],
  },

  // create
  {
    displayName: 'Sales Order ID',
    name: 'salesOrderId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['shipment'],
        operation: ['create'],
      },
    },
    description: 'The ID of the associated sales order',
  },
  {
    displayName: 'Package IDs',
    name: 'packageIds',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['shipment'],
        operation: ['create'],
      },
    },
    description: 'Comma-separated package IDs to include in the shipment',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['shipment'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        default: '',
        description: 'Shipment date in YYYY-MM-DD format',
      },
      {
        displayName: 'Delivery Date',
        name: 'delivery_date',
        type: 'string',
        default: '',
        description: 'Expected delivery date in YYYY-MM-DD format',
      },
      {
        displayName: 'Delivery Method',
        name: 'delivery_method',
        type: 'string',
        default: '',
        description: 'Delivery method (e.g., FedEx, UPS, USPS)',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Shipment notes',
      },
      {
        displayName: 'Shipment Number',
        name: 'shipment_number',
        type: 'string',
        default: '',
        description: 'Custom shipment number',
      },
      {
        displayName: 'Shipping Charge',
        name: 'shipping_charge',
        type: 'number',
        default: 0,
        description: 'Shipping cost',
      },
      {
        displayName: 'Tracking Number',
        name: 'tracking_number',
        type: 'string',
        default: '',
        description: 'Carrier tracking number',
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
        resource: ['shipment'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        default: '',
        description: 'Shipment date in YYYY-MM-DD format',
      },
      {
        displayName: 'Delivery Date',
        name: 'delivery_date',
        type: 'string',
        default: '',
        description: 'Expected delivery date in YYYY-MM-DD format',
      },
      {
        displayName: 'Delivery Method',
        name: 'delivery_method',
        type: 'string',
        default: '',
        description: 'Delivery method',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Shipment notes',
      },
      {
        displayName: 'Shipping Charge',
        name: 'shipping_charge',
        type: 'number',
        default: 0,
        description: 'Shipping cost',
      },
      {
        displayName: 'Tracking Number',
        name: 'tracking_number',
        type: 'string',
        default: '',
        description: 'Carrier tracking number',
      },
    ],
  },
];

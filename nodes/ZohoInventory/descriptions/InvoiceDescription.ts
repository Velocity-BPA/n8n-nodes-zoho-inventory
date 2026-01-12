/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';
import { FILTER_OPTIONS, SORT_ORDERS, DISCOUNT_TYPES } from '../constants/constants';

export const invoiceOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['invoice'],
      },
    },
    options: [
      {
        name: 'Apply Credits',
        value: 'applyCredits',
        description: 'Apply credits to an invoice',
        action: 'Apply credits to invoice',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new invoice',
        action: 'Create an invoice',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete an invoice',
        action: 'Delete an invoice',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve an invoice by ID',
        action: 'Get an invoice',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve many invoices',
        action: 'Get many invoices',
      },
      {
        name: 'Get Payments',
        value: 'getPayments',
        description: 'Get payments for an invoice',
        action: 'Get invoice payments',
      },
      {
        name: 'Mark as Sent',
        value: 'markAsSent',
        description: 'Mark an invoice as sent',
        action: 'Mark invoice as sent',
      },
      {
        name: 'Mark as Void',
        value: 'markAsVoid',
        description: 'Void an invoice',
        action: 'Mark invoice as void',
      },
      {
        name: 'Record Payment',
        value: 'recordPayment',
        description: 'Record a payment for an invoice',
        action: 'Record invoice payment',
      },
      {
        name: 'Send Email',
        value: 'sendEmail',
        description: 'Email an invoice to customer',
        action: 'Send invoice email',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an invoice',
        action: 'Update an invoice',
      },
    ],
    default: 'get',
  },
];

export const invoiceFields: INodeProperties[] = [
  // ----------------------------------
  //         invoice: get, delete, etc.
  // ----------------------------------
  {
    displayName: 'Invoice ID',
    name: 'invoiceId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['get', 'delete', 'update', 'markAsSent', 'markAsVoid', 'sendEmail', 'recordPayment', 'getPayments', 'applyCredits'],
      },
    },
    description: 'The ID of the invoice',
  },

  // ----------------------------------
  //         invoice: getAll
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['invoice'],
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
        resource: ['invoice'],
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
        resource: ['invoice'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        default: '',
        description: 'Filter by customer ID',
      },
      {
        displayName: 'Filter By',
        name: 'filter_by',
        type: 'options',
        options: FILTER_OPTIONS.invoice,
        default: 'Status.All',
        description: 'Filter invoices by status',
      },
      {
        displayName: 'Search Text',
        name: 'search_text',
        type: 'string',
        default: '',
        description: 'Search invoices by number or reference',
      },
      {
        displayName: 'Sort Column',
        name: 'sort_column',
        type: 'options',
        options: [
          { name: 'Invoice Number', value: 'invoice_number' },
          { name: 'Customer Name', value: 'customer_name' },
          { name: 'Date', value: 'date' },
          { name: 'Due Date', value: 'due_date' },
          { name: 'Total', value: 'total' },
          { name: 'Balance', value: 'balance' },
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

  // ----------------------------------
  //         invoice: create
  // ----------------------------------
  {
    displayName: 'Customer ID',
    name: 'customerId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
      },
    },
    description: 'The ID of the customer',
  },
  {
    displayName: 'Line Items',
    name: 'lineItems',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    required: true,
    default: { items: [] },
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
      },
    },
    placeholder: 'Add Line Item',
    options: [
      {
        name: 'items',
        displayName: 'Item',
        values: [
          {
            displayName: 'Item ID',
            name: 'item_id',
            type: 'string',
            default: '',
            description: 'The ID of the item',
          },
          {
            displayName: 'Quantity',
            name: 'quantity',
            type: 'number',
            default: 1,
            description: 'The quantity of the item',
          },
          {
            displayName: 'Rate',
            name: 'rate',
            type: 'number',
            default: 0,
            description: 'The rate of the item',
          },
          {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
            description: 'Line item description',
          },
          {
            displayName: 'Discount',
            name: 'discount',
            type: 'number',
            default: 0,
            description: 'Discount percentage on this line item',
          },
        ],
      },
    ],
    description: 'The line items for the invoice',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Adjustment',
        name: 'adjustment',
        type: 'number',
        default: 0,
        description: 'Adjustment amount',
      },
      {
        displayName: 'Currency ID',
        name: 'currency_id',
        type: 'string',
        default: '',
        description: 'The currency ID for the invoice',
      },
      {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        default: '',
        description: 'Invoice date in YYYY-MM-DD format',
      },
      {
        displayName: 'Discount',
        name: 'discount',
        type: 'number',
        default: 0,
        description: 'Discount percentage',
      },
      {
        displayName: 'Discount Type',
        name: 'discount_type',
        type: 'options',
        options: DISCOUNT_TYPES,
        default: 'entity_level',
        description: 'How discount is applied',
      },
      {
        displayName: 'Due Date',
        name: 'due_date',
        type: 'string',
        default: '',
        description: 'Payment due date in YYYY-MM-DD format',
      },
      {
        displayName: 'Invoice Number',
        name: 'invoice_number',
        type: 'string',
        default: '',
        description: 'Custom invoice number',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Customer notes',
      },
      {
        displayName: 'Payment Terms',
        name: 'payment_terms',
        type: 'number',
        default: 0,
        description: 'Payment terms in days',
      },
      {
        displayName: 'Payment Terms Label',
        name: 'payment_terms_label',
        type: 'string',
        default: '',
        description: 'Payment terms label',
      },
      {
        displayName: 'Sales Order ID',
        name: 'salesorder_id',
        type: 'string',
        default: '',
        description: 'Associated sales order ID',
      },
      {
        displayName: 'Shipping Charge',
        name: 'shipping_charge',
        type: 'number',
        default: 0,
        description: 'Shipping cost',
      },
    ],
  },

  // ----------------------------------
  //         invoice: update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Adjustment',
        name: 'adjustment',
        type: 'number',
        default: 0,
        description: 'Adjustment amount',
      },
      {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        default: '',
        description: 'The ID of the customer',
      },
      {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        default: '',
        description: 'Invoice date in YYYY-MM-DD format',
      },
      {
        displayName: 'Discount',
        name: 'discount',
        type: 'number',
        default: 0,
        description: 'Discount percentage',
      },
      {
        displayName: 'Due Date',
        name: 'due_date',
        type: 'string',
        default: '',
        description: 'Payment due date in YYYY-MM-DD format',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Customer notes',
      },
      {
        displayName: 'Shipping Charge',
        name: 'shipping_charge',
        type: 'number',
        default: 0,
        description: 'Shipping cost',
      },
    ],
  },

  // ----------------------------------
  //         invoice: recordPayment
  // ----------------------------------
  {
    displayName: 'Amount',
    name: 'amount',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['recordPayment'],
      },
    },
    description: 'Payment amount',
  },
  {
    displayName: 'Payment Options',
    name: 'paymentOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['recordPayment'],
      },
    },
    options: [
      {
        displayName: 'Account ID',
        name: 'account_id',
        type: 'string',
        default: '',
        description: 'Account to record payment against',
      },
      {
        displayName: 'Date',
        name: 'date',
        type: 'string',
        default: '',
        description: 'Payment date in YYYY-MM-DD format',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Payment description',
      },
      {
        displayName: 'Payment Mode',
        name: 'payment_mode',
        type: 'string',
        default: '',
        description: 'Mode of payment (e.g., cash, check, credit_card)',
      },
      {
        displayName: 'Reference Number',
        name: 'reference_number',
        type: 'string',
        default: '',
        description: 'Reference number for the payment',
      },
    ],
  },

  // ----------------------------------
  //         invoice: sendEmail
  // ----------------------------------
  {
    displayName: 'Email Options',
    name: 'emailOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['sendEmail'],
      },
    },
    options: [
      {
        displayName: 'Body',
        name: 'body',
        type: 'string',
        typeOptions: {
          rows: 6,
        },
        default: '',
        description: 'Email body content',
      },
      {
        displayName: 'CC Emails',
        name: 'cc_mail_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated CC email addresses',
      },
      {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        default: '',
        description: 'Email subject line',
      },
      {
        displayName: 'To Emails',
        name: 'to_mail_ids',
        type: 'string',
        default: '',
        description: 'Comma-separated recipient email addresses',
      },
    ],
  },

  // ----------------------------------
  //         invoice: applyCredits
  // ----------------------------------
  {
    displayName: 'Credit Note ID',
    name: 'creditNoteId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['applyCredits'],
      },
    },
    description: 'The ID of the credit note to apply',
  },
  {
    displayName: 'Amount to Apply',
    name: 'amountApplied',
    type: 'number',
    required: true,
    default: 0,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['applyCredits'],
      },
    },
    description: 'Amount to apply from the credit note',
  },
];

# n8n-nodes-zoho-inventory

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Zoho Inventory, providing inventory management, order processing, and warehouse operations automation within n8n workflows.

![n8n](https://img.shields.io/badge/n8n-community%20node-ff6d5a)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)

## Features

- **12 Resource Categories** - Complete coverage of Zoho Inventory functionality
- **100+ Operations** - Comprehensive CRUD and action operations
- **Multi-Region Support** - US, EU, IN, AU, and CA data centers
- **OAuth 2.0 Authentication** - Secure authentication with automatic token refresh
- **Pagination Support** - Efficient handling of large datasets
- **Trigger Node** - Poll-based triggers for real-time automation

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes** in n8n
2. Select **Install**
3. Enter `n8n-nodes-zoho-inventory` and confirm

### Manual Installation

```bash
npm install n8n-nodes-zoho-inventory
```

### Development Installation

```bash
# Clone or extract the package
cd n8n-nodes-zoho-inventory

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom nodes directory
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-zoho-inventory

# Restart n8n
n8n start
```

## Credentials Setup

### Zoho Inventory OAuth2 API

| Field | Description |
|-------|-------------|
| Client ID | OAuth Client ID from [Zoho API Console](https://api-console.zoho.com) |
| Client Secret | OAuth Client Secret |
| Region | Zoho data center region (US, EU, IN, AU, CA) |
| Organization ID | Your Zoho Inventory organization ID |

### Setting up OAuth in Zoho

1. Go to [Zoho API Console](https://api-console.zoho.com)
2. Create a new **Server-based Application**
3. Set the redirect URI to your n8n OAuth callback URL
4. Copy the Client ID and Client Secret
5. Use scope: `ZohoInventory.fullaccess.all`

## Resources & Operations

### Item (Product)
- Get, Get All, Create, Update, Delete
- Mark Active/Inactive
- Get Inventory, Update Inventory

### Sales Order
- Get, Get All, Create, Update, Delete
- Confirm, Void
- Convert to Invoice
- Add/Get Comments

### Purchase Order
- Get, Get All, Create, Update, Delete
- Mark as Open, Mark as Billed, Cancel
- Convert to Bill
- Add/Get Comments

### Invoice
- Get, Get All, Create, Update, Delete
- Mark as Sent, Mark as Void
- Send Email
- Record Payment, Get Payments
- Apply Credits

### Contact (Customer/Vendor)
- Get, Get All, Create, Update, Delete
- Mark Active/Inactive
- Get Statements, Send Statement
- Get/Add Addresses

### Package
- Get, Get All, Create, Update, Delete
- Get Shipments

### Shipment
- Get, Get All, Create, Update, Delete
- Mark as Delivered
- Get Tracking

### Warehouse
- Get, Get All, Create, Update, Delete
- Mark Active/Inactive
- Get Stock

### Transfer Order
- Get, Get All, Create, Update, Delete
- Mark as Received
- Get History

### Stock Adjustment
- Get, Get All, Create, Delete

### Composite Item (Bundle/Kit)
- Get, Get All, Create, Update, Delete
- Get Components
- Bundle, Unbundle

### Organization/Settings
- Get Organization, Update Organization
- Get Currencies, Get Taxes, Create Tax
- Get Payment Terms, Get Custom Fields
- Get Preferences

## Trigger Node

The Zoho Inventory Trigger node supports polling for the following events:

- Item Created/Updated
- Sales Order Created/Updated
- Purchase Order Created/Updated
- Invoice Created/Updated
- Contact Created/Updated
- Package Created
- Shipment Created
- Stock Adjustment Created
- Transfer Order Created

## Usage Examples

### Create a Sales Order

```javascript
// Input data
{
  "customerId": "123456789",
  "lineItems": [
    {
      "item_id": "987654321",
      "quantity": 5,
      "rate": 100
    }
  ],
  "reference_number": "PO-2024-001"
}
```

### Sync Inventory Levels

```javascript
// Get all items and their inventory levels
// Then update based on external system data
{
  "itemId": "987654321",
  "warehouseId": "111222333",
  "quantityAvailable": 150
}
```

## Zoho Inventory Concepts

### Item Types
- **Inventory**: Tracked items with stock quantities
- **Sales**: Items for sale only (no stock tracking)
- **Purchases**: Items for purchase only
- **Sales and Purchases**: Dual-purpose items

### Product Types
- **Goods**: Physical products
- **Service**: Non-physical services

### Composite Items
Composite items (bundles/kits) are assemblies of multiple component items. You can:
- **Bundle**: Combine components into a composite item
- **Unbundle**: Break down a composite into components

## Multi-Region Support

Zoho Inventory operates from multiple data centers:

| Region | API URL | Accounts URL |
|--------|---------|--------------|
| US | zohoapis.com | accounts.zoho.com |
| EU | zohoapis.eu | accounts.zoho.eu |
| IN | zohoapis.in | accounts.zoho.in |
| AU | zohoapis.com.au | accounts.zoho.com.au |
| CA | zohoapis.ca | accounts.zohocloud.ca |

## Error Handling

The node handles common Zoho API errors:

| Code | Description |
|------|-------------|
| 0 | Success |
| 1 | Internal error |
| 2 | Bad request |
| 14 | Invalid value |
| 36 | Resource not found |
| 44 | Rate limit exceeded |
| 57 | Authentication failed |

## Rate Limiting

Zoho Inventory API has the following limits:
- **100 requests per minute** per organization
- Concurrent request limits vary by plan

The node automatically handles pagination for large datasets.

## Security Best Practices

1. **Use environment variables** for credentials
2. **Limit OAuth scopes** to required permissions
3. **Rotate credentials** periodically
4. **Monitor API usage** for anomalies
5. **Enable MFA** on your Zoho account

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint
npm run lint

# Fix lint issues
npm run lint:fix
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/Velocity-BPA/n8n-nodes-zoho-inventory/issues)
- **Documentation**: [Zoho Inventory API Documentation](https://www.zoho.com/inventory/api/v1/)
- **n8n Community**: [n8n Community Forum](https://community.n8n.io/)

## Acknowledgments

- [n8n](https://n8n.io/) - The workflow automation platform
- [Zoho](https://www.zoho.com/) - For their comprehensive Inventory API
- The n8n community for feedback and contributions

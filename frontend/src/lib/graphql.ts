import { gql } from '@apollo/client';

// Product Queries
export const GET_PRODUCTS = gql`
  query GetProducts($where: ProductFilterInput, $order: [ProductSortInput!]) {
    products(where: $where, order: $order) {
      productId
      name
      description
      shopifyProductId
      createdAt
      updatedAt
      variants {
        variantId
        sku
        price
        shopifyVariantId
      }
    }
  }
`;

// Variant Queries
export const GET_VARIANTS = gql`
  query GetVariants($where: VariantFilterInput, $order: [VariantSortInput!]) {
    variants(where: $where, order: $order) {
      variantId
      productId
      sku
      price
      shopifyVariantId
      createdAt
      updatedAt
      product {
        productId
        name
      }
      variantAttributeValues {
        attributeValueId
        productAttributeValue {
          value
          attribute {
            name
          }
        }
      }
    }
  }
`;

// Inventory Queries
export const GET_INVENTORY = gql`
  query GetInventory($where: InventoryFilterInput, $order: [InventorySortInput!]) {
    inventory(where: $where, order: $order) {
      inventoryId
      variantId
      binId
      quantity
      lastUpdated
      variant {
        variantId
        sku
        product {
          name
        }
      }
      bin {
        binId
        name
        locationDescription
      }
    }
  }
`;

// Order Queries
export const GET_ORDERS = gql`
  query GetOrders($where: OrderFilterInput, $order: [OrderSortInput!]) {
    orders(where: $where, order: $order) {
      orderId
      shopifyOrderId
      orderDate
      customerName
      shippingAddress
      totalAmount
      status
      createdAt
      updatedAt
      orderItems {
        orderItemId
        quantity
        priceAtPurchase
        variant {
          variantId
          sku
          product {
            name
          }
        }
      }
    }
  }
`;

// Order Mutations
export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: UUID!, $newStatus: String!) {
    updateOrderStatus(orderId: $orderId, newStatus: $newStatus) {
      orderId
      status
      updatedAt
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($orderId: UUID!) {
    order(orderId: $orderId) {
      orderId
      shopifyOrderId
      orderDate
      customerName
      shippingAddress
      totalAmount
      status
      createdAt
      updatedAt
      orderItems {
        orderItemId
        quantity
        priceAtPurchase
        variant {
          variantId
          sku
          price
          product {
            productId
            name
            description
          }
        }
      }
    }
  }
`;

// Fulfillment Mutations
export const GENERATE_SHIPPING_LABEL = gql`
  mutation GenerateShippingLabel($orderId: UUID!) {
    generateShippingLabel(orderId: $orderId) {
      orderId
      labelUrl
      trackingNumber
      carrier
      estimatedDelivery
      success
      message
    }
  }
`;

export const DEDUCT_INVENTORY = gql`
  mutation DeductInventory($variantId: UUID!, $binId: UUID!, $quantity: Int!) {
    deductInventory(variantId: $variantId, binId: $binId, quantity: $quantity) {
      inventoryId
      variantId
      binId
      quantity
      success
      message
    }
  }
`;

// Analytics Queries
export const GET_REVENUE_DATA = gql`
  query GetRevenueData($startDate: DateTime!, $endDate: DateTime!) {
    revenueData(startDate: $startDate, endDate: $endDate) {
      date
      totalRevenue
      orderCount
      averageOrderValue
    }
  }
`;

export const GET_TOP_SELLING_VARIANTS = gql`
  query GetTopSellingVariants($limit: Int!) {
    topSellingVariants(limit: $limit) {
      variantId
      sku
      productName
      totalSold
      revenue
    }
  }
`;

export const GET_LOW_STOCK_ALERTS = gql`
  query GetLowStockAlerts($threshold: Int!) {
    lowStockAlerts(threshold: $threshold) {
      inventoryId
      variantId
      sku
      productName
      currentQuantity
      binName
    }
  }
`;

// Shopify Sync
export const SYNC_SHOPIFY_DATA = gql`
  mutation SyncShopifyData {
    syncShopifyData {
      success
      productsSynced
      ordersSynced
    }
  }
`;

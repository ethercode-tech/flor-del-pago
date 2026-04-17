export interface MenuCategory {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  priceLabel: string | null;
  imageUrl: string | null;
  tags: string[];
  isSignature: boolean;
  isAvailable: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategoryInput {
  slug: string;
  name: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface MenuItemInput {
  categoryId: string;
  name: string;
  description: string;
  priceLabel?: string;
  imageUrl?: string;
  tags?: string[];
  isSignature: boolean;
  isAvailable: boolean;
  displayOrder: number;
}

export interface PublicMenuSection {
  category: MenuCategory;
  items: MenuItem[];
}

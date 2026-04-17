import { addDays } from "date-fns";
import { buildDashboardSummary } from "@/domain/dashboard";
import type {
  Customer,
  DashboardSummary,
  Reservation,
  ReservationRequest,
  RestaurantTable,
} from "@/domain/entities";
import type { MenuCategory, MenuCategoryInput, MenuItem, MenuItemInput, PublicMenuSection } from "@/domain/menu";
import type {
  CustomerRepository,
  DashboardRepository,
  MenuRepository,
  NotificationGateway,
  ReservationRepository,
  TableRepository,
} from "@/infrastructure/repositories/types";
import { toISODate } from "@/lib/utils";
import { menuCategoriesCatalog } from "@/content/menu-catalog";

const now = new Date().toISOString();
const today = toISODate(new Date());
const tomorrow = toISODate(addDays(new Date(), 1));

const baseTables: RestaurantTable[] = [
  { id: "t1", tableName: "Mesa 1", area: "interior", capacity: 2, status: "libre", createdAt: now, updatedAt: now },
  { id: "t2", tableName: "Mesa 2", area: "interior", capacity: 4, status: "libre", createdAt: now, updatedAt: now },
  { id: "t3", tableName: "Mesa 3", area: "galeria", capacity: 4, status: "libre", createdAt: now, updatedAt: now },
  { id: "t4", tableName: "Mesa 4", area: "jardin", capacity: 6, status: "libre", createdAt: now, updatedAt: now },
  { id: "t5", tableName: "Mesa 5", area: "jardin", capacity: 8, status: "libre", createdAt: now, updatedAt: now },
];

const customers: Customer[] = [];
const reservations: Reservation[] = [
  {
    id: "r1",
    customerId: "c1",
    customerName: "María Gómez",
    customerPhone: "+543885000001",
    customerEmail: "maria@example.com",
    reservationDate: today,
    reservationTime: "21:00",
    guestsCount: 2,
    areaPreference: "interior",
    occasionType: "aniversario",
    notes: "Mesa tranquila",
    status: "confirmed",
    source: "web",
    assignedTableId: "t1",
    confirmationSentAt: now,
    reminderSentAt: null,
    createdBy: null,
    updatedBy: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r2",
    customerId: "c2",
    customerName: "Carlos Ruiz",
    customerPhone: "+543885000002",
    customerEmail: "carlos@example.com",
    reservationDate: tomorrow,
    reservationTime: "13:00",
    guestsCount: 4,
    areaPreference: "jardin",
    occasionType: null,
    notes: null,
    status: "pending",
    source: "whatsapp",
    assignedTableId: "t4",
    confirmationSentAt: null,
    reminderSentAt: null,
    createdBy: null,
    updatedBy: null,
    createdAt: now,
    updatedAt: now,
  },
];

const menuCategories: MenuCategory[] = menuCategoriesCatalog.map((category, index) => ({
  id: `mc${index + 1}`,
  slug: category.slug,
  name: category.title,
  description: category.intro,
  displayOrder: index + 1,
  isActive: true,
  createdAt: now,
  updatedAt: now,
}));

const menuItems: MenuItem[] = menuCategories.flatMap((category) => {
  const source = menuCategoriesCatalog.find((entry) => entry.slug === category.slug);
  if (!source) return [];
  return source.dishes.map((dish, index) => ({
    id: `mi_${category.id}_${index + 1}`,
    categoryId: category.id,
    name: dish.name,
    description: dish.description,
    priceLabel: dish.priceLabel ?? null,
    imageUrl: dish.image ?? null,
    tags: dish.tags ?? [],
    isSignature: Boolean(dish.tags?.some((tag) => /chef|signature|favorito/i.test(tag))),
    isAvailable: true,
    displayOrder: index + 1,
    createdAt: now,
    updatedAt: now,
  }));
});
export class InMemoryReservationRepository implements ReservationRepository {
  async listByDate(dateISO: string): Promise<Reservation[]> {
    return reservations.filter((reservation) => reservation.reservationDate === dateISO);
  }

  async listBetweenDates(fromDateISO: string, toDateISO: string): Promise<Reservation[]> {
    return reservations.filter(
      (reservation) => reservation.reservationDate >= fromDateISO && reservation.reservationDate <= toDateISO,
    );
  }

  async listAll(): Promise<Reservation[]> {
    return [...reservations];
  }

  async create(
    input: ReservationRequest & {
      customerId: string;
      assignedTableId: string | null;
    },
  ): Promise<Reservation> {
    const createdAt = new Date().toISOString();
    const reservation: Reservation = {
      id: `r${reservations.length + 1}`,
      customerId: input.customerId,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      reservationDate: input.reservationDate,
      reservationTime: input.reservationTime,
      guestsCount: input.guestsCount,
      areaPreference: input.areaPreference ?? null,
      occasionType: input.occasionType ?? null,
      notes: input.notes ?? null,
      status: input.assignedTableId ? "confirmed" : "pending",
      source: input.source ?? "web",
      assignedTableId: input.assignedTableId,
      confirmationSentAt: input.assignedTableId ? createdAt : null,
      reminderSentAt: null,
      createdBy: null,
      updatedBy: null,
      createdAt,
      updatedAt: createdAt,
    };
    reservations.push(reservation);
    return reservation;
  }

  async update(
    reservationId: string,
    payload: Partial<Pick<Reservation, "reservationDate" | "reservationTime" | "status" | "assignedTableId" | "notes">>,
  ): Promise<Reservation> {
    const index = reservations.findIndex((reservation) => reservation.id === reservationId);
    if (index < 0) {
      throw new Error("Reserva no encontrada");
    }
    reservations[index] = {
      ...reservations[index],
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    return reservations[index];
  }
}

export class InMemoryCustomerRepository implements CustomerRepository {
  async upsertByContact(input: { name: string; phone: string; email: string }): Promise<{ id: string }> {
    const existing = customers.find((customer) => customer.phone === input.phone || customer.email === input.email);
    if (existing) {
      existing.name = input.name;
      existing.phone = input.phone;
      existing.email = input.email;
      existing.updatedAt = new Date().toISOString();
      return { id: existing.id };
    }
    const createdAt = new Date().toISOString();
    const customer: Customer = {
      id: `c${customers.length + 1}`,
      name: input.name,
      phone: input.phone,
      email: input.email,
      birthday: null,
      notes: null,
      vip: false,
      visitCount: 0,
      totalSpent: 0,
      createdAt,
      updatedAt: createdAt,
    };
    customers.push(customer);
    return { id: customer.id };
  }
}

export class InMemoryTableRepository implements TableRepository {
  async listAll(): Promise<RestaurantTable[]> {
    return [...baseTables];
  }
}

export class InMemoryDashboardRepository implements DashboardRepository {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly tableRepository: TableRepository,
  ) {}

  async getSummary(dateISO: string): Promise<DashboardSummary> {
    const allReservations = await this.reservationRepository.listAll();
    const allTables = await this.tableRepository.listAll();
    return buildDashboardSummary(dateISO, allReservations, allTables);
  }
}

export class ConsoleNotificationGateway implements NotificationGateway {
  async sendWhatsApp(input: { to: string; message: string }): Promise<void> {
    console.info("[WHATSAPP]", input.to, input.message);
  }

  async sendEmail(input: { to: string; subject: string; html: string }): Promise<void> {
    console.info("[EMAIL]", input.to, input.subject, input.html.slice(0, 140));
  }
}

export class InMemoryMenuRepository implements MenuRepository {
  async listCategories(): Promise<MenuCategory[]> {
    return [...menuCategories].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async createCategory(input: MenuCategoryInput): Promise<MenuCategory> {
    const createdAt = new Date().toISOString();
    const category: MenuCategory = {
      id: `mc${menuCategories.length + 1}`,
      slug: input.slug,
      name: input.name,
      description: input.description ?? null,
      displayOrder: input.displayOrder,
      isActive: input.isActive,
      createdAt,
      updatedAt: createdAt,
    };
    menuCategories.push(category);
    return category;
  }

  async updateCategory(categoryId: string, input: Partial<MenuCategoryInput>): Promise<MenuCategory> {
    const index = menuCategories.findIndex((category) => category.id === categoryId);
    if (index < 0) throw new Error("Categoria no encontrada");
    menuCategories[index] = {
      ...menuCategories[index],
      ...input,
      description: input.description ?? menuCategories[index].description,
      updatedAt: new Date().toISOString(),
    };
    return menuCategories[index];
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const index = menuCategories.findIndex((category) => category.id === categoryId);
    if (index >= 0) menuCategories.splice(index, 1);
    for (let i = menuItems.length - 1; i >= 0; i -= 1) {
      if (menuItems[i].categoryId === categoryId) menuItems.splice(i, 1);
    }
  }

  async listItems(categoryId?: string): Promise<MenuItem[]> {
    return [...menuItems]
      .filter((item) => (categoryId ? item.categoryId === categoryId : true))
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async createItem(input: MenuItemInput): Promise<MenuItem> {
    const createdAt = new Date().toISOString();
    const item: MenuItem = {
      id: `mi${menuItems.length + 1}`,
      categoryId: input.categoryId,
      name: input.name,
      description: input.description,
      priceLabel: input.priceLabel ?? null,
      imageUrl: input.imageUrl ?? null,
      tags: input.tags ?? [],
      isSignature: input.isSignature,
      isAvailable: input.isAvailable,
      displayOrder: input.displayOrder,
      createdAt,
      updatedAt: createdAt,
    };
    menuItems.push(item);
    return item;
  }

  async updateItem(itemId: string, input: Partial<MenuItemInput>): Promise<MenuItem> {
    const index = menuItems.findIndex((item) => item.id === itemId);
    if (index < 0) throw new Error("Plato no encontrado");
    menuItems[index] = {
      ...menuItems[index],
      ...input,
      tags: input.tags ?? menuItems[index].tags,
      imageUrl: input.imageUrl ?? menuItems[index].imageUrl,
      priceLabel: input.priceLabel ?? menuItems[index].priceLabel,
      updatedAt: new Date().toISOString(),
    };
    return menuItems[index];
  }

  async deleteItem(itemId: string): Promise<void> {
    const index = menuItems.findIndex((item) => item.id === itemId);
    if (index >= 0) menuItems.splice(index, 1);
  }

  async listPublicMenu(): Promise<PublicMenuSection[]> {
    const categories = await this.listCategories();
    const items = await this.listItems();
    return categories
      .filter((category) => category.isActive)
      .map((category) => ({
        category,
        items: items.filter((item) => item.categoryId === category.id && item.isAvailable),
      }))
      .filter((section) => section.items.length > 0);
  }
}






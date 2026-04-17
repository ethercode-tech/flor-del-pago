"use client";

import { FormEvent, useMemo, useState } from "react";
import type { MenuCategory, MenuItem } from "@/domain/menu";
import { Button } from "@/ui/components/button";

type CategoryDraft = {
  slug: string;
  name: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
};

type ItemDraft = {
  categoryId: string;
  name: string;
  description: string;
  priceLabel: string;
  imageUrl: string;
  tags: string;
  isSignature: boolean;
  isAvailable: boolean;
  displayOrder: number;
};

const INITIAL_CATEGORY: CategoryDraft = {
  slug: "",
  name: "",
  description: "",
  displayOrder: 1,
  isActive: true,
};

const INITIAL_ITEM: ItemDraft = {
  categoryId: "",
  name: "",
  description: "",
  priceLabel: "",
  imageUrl: "",
  tags: "",
  isSignature: false,
  isAvailable: true,
  displayOrder: 1,
};

export function AdminMenuManager({
  initialCategories,
  initialItems,
}: {
  initialCategories: MenuCategory[];
  initialItems: MenuItem[];
}) {
  const [categories, setCategories] = useState<MenuCategory[]>(initialCategories);
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [categoryDraft, setCategoryDraft] = useState<CategoryDraft>(INITIAL_CATEGORY);
  const [itemDraft, setItemDraft] = useState<ItemDraft>(INITIAL_ITEM);
  const [status, setStatus] = useState<string>("");

  async function loadData() {
    const [categoriesRes, itemsRes] = await Promise.all([
      fetch("/api/admin/menu/categories"),
      fetch("/api/admin/menu/items"),
    ]);
    const categoriesJson = (await categoriesRes.json()) as { categories?: MenuCategory[]; error?: string };
    const itemsJson = (await itemsRes.json()) as { items?: MenuItem[]; error?: string };
    if (categoriesJson.error) throw new Error(categoriesJson.error);
    if (itemsJson.error) throw new Error(itemsJson.error);
    setCategories(categoriesJson.categories ?? []);
    setItems(itemsJson.items ?? []);
  }

  const groupedItems = useMemo(() => {
    return categories.map((category) => ({
      category,
      items: items.filter((item) => item.categoryId === category.id).sort((a, b) => a.displayOrder - b.displayOrder),
    }));
  }, [categories, items]);

  async function createCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Guardando categoria...");
    const response = await fetch("/api/admin/menu/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryDraft),
    });
    const payload = (await response.json()) as { error?: string };
    if (!response.ok) {
      setStatus(payload.error ?? "No se pudo crear la categoria");
      return;
    }
    setCategoryDraft(INITIAL_CATEGORY);
    await loadData();
    setStatus("Categoria creada");
  }

  async function createItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Guardando plato...");
    const response = await fetch("/api/admin/menu/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...itemDraft,
        tags: itemDraft.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    });
    const payload = (await response.json()) as { error?: string };
    if (!response.ok) {
      setStatus(payload.error ?? "No se pudo crear el plato");
      return;
    }
    setItemDraft((prev) => ({ ...INITIAL_ITEM, categoryId: prev.categoryId }));
    await loadData();
    setStatus("Plato creado");
  }

  async function toggleCategory(category: MenuCategory) {
    setStatus("Actualizando categoria...");
    const response = await fetch(`/api/admin/menu/categories/${category.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !category.isActive }),
    });
    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setStatus(payload.error ?? "No se pudo actualizar la categoria");
      return;
    }
    await loadData();
    setStatus("Categoria actualizada");
  }

  async function toggleItem(item: MenuItem) {
    setStatus("Actualizando plato...");
    const response = await fetch(`/api/admin/menu/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isAvailable: !item.isAvailable }),
    });
    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setStatus(payload.error ?? "No se pudo actualizar el plato");
      return;
    }
    await loadData();
    setStatus("Plato actualizado");
  }

  async function removeItem(itemId: string) {
    setStatus("Eliminando plato...");
    const response = await fetch(`/api/admin/menu/items/${itemId}`, { method: "DELETE" });
    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setStatus(payload.error ?? "No se pudo eliminar el plato");
      return;
    }
    await loadData();
    setStatus("Plato eliminado");
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <form onSubmit={createCategory} className="rounded-2xl border border-white/15 bg-[var(--surface)] p-5">
          <h3 className="font-serif text-2xl">Nueva categoria</h3>
          <div className="mt-4 grid gap-3">
            <input
              value={categoryDraft.name}
              onChange={(event) => setCategoryDraft((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Nombre de categoria"
              className="rounded-xl border border-white/20 bg-black px-3 py-2"
            />
            <input
              value={categoryDraft.slug}
              onChange={(event) => setCategoryDraft((prev) => ({ ...prev, slug: event.target.value.toLowerCase().replace(/\s+/g, "-") }))}
              placeholder="slug"
              className="rounded-xl border border-white/20 bg-black px-3 py-2"
            />
            <textarea
              value={categoryDraft.description}
              onChange={(event) => setCategoryDraft((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Descripcion breve"
              className="rounded-xl border border-white/20 bg-black px-3 py-2"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min={1}
                value={categoryDraft.displayOrder}
                onChange={(event) => setCategoryDraft((prev) => ({ ...prev, displayOrder: Number(event.target.value) }))}
                className="rounded-xl border border-white/20 bg-black px-3 py-2"
              />
              <label className="flex items-center gap-2 rounded-xl border border-white/20 bg-black px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={categoryDraft.isActive}
                  onChange={(event) => setCategoryDraft((prev) => ({ ...prev, isActive: event.target.checked }))}
                />
                Activa
              </label>
            </div>
            <Button type="submit">Crear categoria</Button>
          </div>
        </form>

        <form onSubmit={createItem} className="rounded-2xl border border-white/15 bg-[var(--surface)] p-5">
          <h3 className="font-serif text-2xl">Nuevo plato</h3>
          <div className="mt-4 grid gap-3">
            <select
              value={itemDraft.categoryId}
              onChange={(event) => setItemDraft((prev) => ({ ...prev, categoryId: event.target.value }))}
              className="rounded-xl border border-white/20 bg-black px-3 py-2"
            >
              <option value="">Seleccionar categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              value={itemDraft.name}
              onChange={(event) => setItemDraft((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Nombre del plato"
              className="rounded-xl border border-white/20 bg-black px-3 py-2"
            />
            <textarea
              value={itemDraft.description}
              onChange={(event) => setItemDraft((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Descripcion"
              className="rounded-xl border border-white/20 bg-black px-3 py-2"
            />
            <input
              value={itemDraft.imageUrl}
              onChange={(event) => setItemDraft((prev) => ({ ...prev, imageUrl: event.target.value }))}
              placeholder="URL de imagen"
              className="rounded-xl border border-white/20 bg-black px-3 py-2"
            />
            <input
              value={itemDraft.priceLabel}
              onChange={(event) => setItemDraft((prev) => ({ ...prev, priceLabel: event.target.value }))}
              placeholder="Precio o etiqueta"
              className="rounded-xl border border-white/20 bg-black px-3 py-2"
            />
            <input
              value={itemDraft.tags}
              onChange={(event) => setItemDraft((prev) => ({ ...prev, tags: event.target.value }))}
              placeholder="Tags separadas por coma"
              className="rounded-xl border border-white/20 bg-black px-3 py-2"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                min={1}
                value={itemDraft.displayOrder}
                onChange={(event) => setItemDraft((prev) => ({ ...prev, displayOrder: Number(event.target.value) }))}
                className="rounded-xl border border-white/20 bg-black px-3 py-2"
              />
              <label className="flex items-center gap-2 rounded-xl border border-white/20 bg-black px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={itemDraft.isAvailable}
                  onChange={(event) => setItemDraft((prev) => ({ ...prev, isAvailable: event.target.checked }))}
                />
                Disponible
              </label>
              <label className="flex items-center gap-2 rounded-xl border border-white/20 bg-black px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={itemDraft.isSignature}
                  onChange={(event) => setItemDraft((prev) => ({ ...prev, isSignature: event.target.checked }))}
                />
                Signature
              </label>
            </div>
            <Button type="submit">Crear plato</Button>
          </div>
        </form>
      </div>

      {status && <p className="text-sm text-white/75">{status}</p>}

      <div className="space-y-4">
        {groupedItems.map((group) => (
          <article key={group.category.id} className="rounded-2xl border border-white/15 bg-[var(--surface)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="font-serif text-2xl">{group.category.name}</h4>
                <p className="text-sm text-white/70">{group.category.description}</p>
              </div>
              <Button variant="ghost" onClick={() => toggleCategory(group.category)}>
                {group.category.isActive ? "Desactivar categoria" : "Activar categoria"}
              </Button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {group.items.map((item) => (
                <div key={item.id} className="rounded-xl border border-white/20 bg-black/35 p-4">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-white/70">{item.description}</p>
                  <p className="mt-1 text-xs text-white/55">Orden: {item.displayOrder}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="ghost" onClick={() => toggleItem(item)}>
                      {item.isAvailable ? "Ocultar" : "Publicar"}
                    </Button>
                    <Button variant="ghost" onClick={() => removeItem(item.id)}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
              {group.items.length === 0 && <p className="text-sm text-white/60">Sin platos en esta categoria.</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

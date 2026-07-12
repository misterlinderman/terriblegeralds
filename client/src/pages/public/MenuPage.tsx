import { useEffect, useState } from 'react';
import Button from '../../components/marketing/Button';
import PizzaCard from '../../components/marketing/PizzaCard';
import SectionHeader from '../../components/marketing/SectionHeader';
import {
  fetchMenuDrinks,
  fetchMenuItems,
  fetchMenuSalads,
  fetchMenuStarters,
} from '../../services/contentApi';
import type { MenuItem, MenuListItem } from '../../types';

function MenuListRows({ items }: { items: MenuListItem[] }) {
  return (
    <div className="list-rows">
      {items.map((item, i) => (
        <div className="list-row" key={i}>
          <div>
            <span className="nm">
              {item.name}
              {item.tag && (
                <span className={`tag${item.tag === 'GF' ? ' gf' : ''}`}>{item.tag}</span>
              )}
            </span>
            <small className="ds">{item.description}</small>
          </div>
          {item.price && <span className="pr">{item.price}</span>}
        </div>
      ))}
    </div>
  );
}

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<MenuItem[]>([]);
  const [starters, setStarters] = useState<MenuListItem[]>([]);
  const [salads, setSalads] = useState<MenuListItem[]>([]);
  const [drinks, setDrinks] = useState<MenuListItem[]>([]);

  useEffect(() => {
    Promise.all([
      fetchMenuItems(),
      fetchMenuStarters(),
      fetchMenuSalads(),
      fetchMenuDrinks(),
    ])
      .then(([menuItems, starterItems, saladItems, drinkItems]) => {
        setPizzas(menuItems);
        setStarters(starterItems);
        setSalads(saladItems);
        setDrinks(drinkItems);
      })
      .catch((error) => console.error('Failed to load menu:', error));
  }, []);

  return (
    <div className="brand-site">
      <div className="pg-hero">
        <div className="wrap">
          <span className="kicker">terrible names. you&apos;ll order anyway.</span>
          <h1>The Full Menu</h1>
          <p>
            Eight pizzas, a few things to eat while you wait, and a promise that we will
            never, ever call anything &quot;artisanal.&quot;
          </p>
        </div>
      </div>

      <section className="pg" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <div className="menu-cat">
            <SectionHeader kicker="wood-fired · 12in · serves 1-2" title="Pizzas" />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4,1fr)',
                gap: 18,
              }}
              className="gerald-pizza-grid"
            >
              {pizzas.map((item) => (
                <PizzaCard
                  key={item._id}
                  name={item.name}
                  ingredients={item.description}
                  image={item.imagePath}
                />
              ))}
            </div>
            <p style={{ marginTop: 16, fontSize: '.85rem', color: 'var(--ink-soft)' }}>
              Gluten-free crust available on any pie,{' '}
              <span className="tag gf">+$3</span> — limited daily, ask at the window.
            </p>
          </div>

          <div className="menu-cat">
            <SectionHeader kicker="while the oven works" title="Starters" />
            <MenuListRows items={starters} />
          </div>

          <div className="menu-cat">
            <SectionHeader kicker="green, allegedly" title="Salads" />
            <MenuListRows items={salads} />
          </div>

          <div className="menu-cat">
            <SectionHeader kicker="to wash it down" title="Drinks" />
            <MenuListRows items={drinks} />
          </div>

          <div className="allergen-box">
            <p>
              <strong>Dietary &amp; allergen notes:</strong> VG = vegetarian. Everything is
              made in a small wood-fired trailer that also handles gluten, dairy, and nuts —
              we take real care, but we can&apos;t promise a sterile kitchen. Ask Gerald (or
              whoever&apos;s in the window) if you&apos;ve got a serious allergy, and we&apos;ll
              level with you.
            </p>
          </div>

          <div style={{ marginTop: 46, textAlign: 'center' }}>
            <Button variant="red" href="/events">
              Find Us This Week →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

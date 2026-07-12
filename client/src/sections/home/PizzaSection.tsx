import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PizzaCard from '../../components/marketing/PizzaCard';
import SectionHeader from '../../components/marketing/SectionHeader';
import { fetchMenuItems } from '../../services/contentApi';
import type { MenuItem } from '../../types';

export default function PizzaSection() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchMenuItems()
      .then(setMenuItems)
      .catch((error) => console.error('Failed to load menu items:', error));
  }, []);

  const displayItems = menuItems.slice(0, 4);

  return (
    <section style={{ padding: '74px 0', background: 'var(--cream)' }} id="pizza">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader
          kicker="terrible names. you'll order anyway."
          title="Our Pizzas"
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 18,
          }}
          className="gerald-pizza-grid"
        >
          {displayItems.map((item) => (
            <PizzaCard
              key={item._id}
              name={item.name}
              ingredients={item.description}
              image={item.imagePath}
            />
          ))}
        </div>
        <Link
          to="/menu"
          style={{
            marginTop: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed var(--red)',
            color: 'var(--red)',
            fontFamily: 'var(--font-display)',
            textAlign: 'center',
            borderRadius: 8,
            minHeight: 70,
            textDecoration: 'none',
          }}
        >
          MORE PIES PLZ! → SEE THE FULL MENU
        </Link>
      </div>
    </section>
  );
}

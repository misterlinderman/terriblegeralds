const { PizzaCard, SectionHeader } = window.TerribleGeraldSDesignSystem_d3d4e8;

const PIZZAS = [
  { name: 'The Gerald', ingredients: 'Red sauce, mozz, pepperoni, hot honey, parm, basil' },
  { name: 'The Hoppen', ingredients: 'Garlic oil, mozz, sausage, hot honey, ricotta, arugula' },
  { name: 'The Meat Sweats', ingredients: 'Red sauce, mozz, pepperoni, sausage, bacon, hot honey' },
  { name: 'The Veg Out', ingredients: 'Garlic oil, mozz, mushroom, red onion, spinach, ricotta' },
];

function PizzaSection() {
  return (
    <section style={{ padding: '74px 0', background: 'var(--cream)' }} id="pizza">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader kicker="terrible names. you'll order anyway." title="Our Pizzas" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }} className="gerald-pizza-grid">
          {PIZZAS.map((p, i) => <PizzaCard key={i} {...p} />)}
        </div>
        <a href="menu.html" style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--red)', color: 'var(--red)', fontFamily: 'var(--font-display)', textAlign: 'center', borderRadius: 8, minHeight: 70, textDecoration: 'none' }}>MORE PIES PLZ! → SEE THE FULL MENU</a>
      </div>
    </section>
  );
}
window.PizzaSection = PizzaSection;

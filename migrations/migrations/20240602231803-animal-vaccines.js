module.exports = {
  async up(db, client) {
    // Inserção de vacinas para cães
    await db.collection('dogVaccines').insertMany([
      {
        nome: 'V8',
        descricao:
          'Protege contra cinomose, hepatite infecciosa canina, adenovírus tipo 2, parvovirose, parainfluenza e dois tipos de leptospirose.',
        reforco_anual: true,
      },
      {
        nome: 'V10',
        descricao:
          'Protege contra cinomose, hepatite infecciosa canina, adenovírus tipo 2, parvovirose, parainfluenza e quatro tipos de leptospirose.',
        reforco_anual: true,
      },
      {
        nome: 'Antirrábica',
        descricao:
          'Protege contra a raiva, uma doença viral fatal que pode ser transmitida aos humanos.',
        reforco_anual: true,
      },
      {
        nome: 'Giárdia',
        descricao:
          'Protege contra a giardíase, uma infecção intestinal causada por um protozoário.',
        reforco_anual: true,
      },
      {
        nome: 'Tosse dos Canis',
        descricao:
          'Protege contra a tosse dos canis, também conhecida como traqueobronquite infecciosa canina.',
        reforco_anual: true,
      },
      {
        nome: 'Leishmaniose',
        descricao:
          'Protege contra a leishmaniose visceral canina, uma doença grave transmitida por mosquitos flebótomos.',
        reforco_anual: true,
      },
    ]);

    // Inserção de vacinas para gatos
    await db.collection('catVaccines').insertMany([
      {
        nome: 'V3',
        descricao:
          'Protege contra panleucopenia felina, rinotraqueíte viral felina e calicivirose felina.',
        reforco_anual: true,
      },
      {
        nome: 'V4',
        descricao:
          'Protege contra panleucopenia felina, rinotraqueíte viral felina, calicivirose felina e clamidiose felina.',
        reforco_anual: true,
      },
      {
        nome: 'V5',
        descricao:
          'Protege contra panleucopenia felina, rinotraqueíte viral felina, calicivirose felina, clamidiose felina e leucemia felina.',
        reforco_anual: true,
      },
      { nome: 'Antirrábica', descricao: 'Protege contra a raiva.', reforco_anual: true },
    ]);
  },

  async down(db, client) {
    await db.collection('dogVaccines').deleteMany({});
    await db.collection('catVaccines').deleteMany({});
  },
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        id: 'varicaps',
        name: 'Варикапы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'varistors',
        name: 'Варисторы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'reed_switches',
        name: 'Герконы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'fuse_holders',
        name: 'Держатели предохранителей',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'dinistors',
        name: 'Динисторы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'diode_bridges',
        name: 'Диодные мосты',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'diodes',
        name: 'Диоды',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'power_diodes',
        name: 'Диоды силовые',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'drossels',
        name: 'Дроссели',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'microwave_mil',
        name: 'СВЧ и Военка',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'measuring_heads',
        name: 'Изм головки',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'indicators',
        name: 'Индикаторы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'quartz',
        name: 'Кварцы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'switching',
        name: 'Коммутация',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 'capacitors_non_polar',
        name: 'Конденсаторы неполярные',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'capacitors_polar',
        name: 'Конденсаторы полярные',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'fastener_down_conductor',
        name: 'Метизы и токоотводы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'microchips',
        name: 'Микросхемы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'power_modules',
        name: 'Модули силовые',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'optocouplers',
        name: 'Оптопары',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'coolers',
        name: 'Охладители',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'circuit_breakers',
        name: 'Предохранители',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'connectors',
        name: 'Разъёмы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'resistors_variable',
        name: 'Резисторы переменные',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'resistors',
        name: 'Резисторы постоянные',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'relay',
        name: 'Рэле',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'thermistors',
        name: 'Терморезисторы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'thyristors',
        name: 'Тиристоры',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'power_thyristors',
        name: 'Тиристоры силовые',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'bipolar_transistors',
        name: 'Транзисторы биполярные',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'field_transistors',
        name: 'Транзисторы полевые',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'power_transistors',
        name: 'Транзисторы силовые',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'shunts',
        name: 'Шунты',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'electrical_equipment',
        name: 'Электрооборудование',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};

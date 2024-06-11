import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const main = async () => {
  const categories = [
    {
      id: 'varicaps',
      name: 'Варикапы',
    },
    {
      id: 'varistors',
      name: 'Варисторы',
    },
    {
      id: 'reed_switches',
      name: 'Герконы',
    },
    {
      id: 'fuse_holders',
      name: 'Держатели предохранителей',
    },
    {
      id: 'dinistors',
      name: 'Динисторы',
    },
    {
      id: 'diode_bridges',
      name: 'Диодные мосты',
    },
    {
      id: 'diodes',
      name: 'Диоды',
    },
    {
      id: 'power_diodes',
      name: 'Диоды силовые',
    },
    {
      id: 'drossels',
      name: 'Дроссели',
    },
    {
      id: 'microwave_mil',
      name: 'СВЧ и Военка',
    },
    {
      id: 'measuring_heads',
      name: 'Изм головки',
    },
    {
      id: 'indicators',
      name: 'Индикаторы',
    },
    {
      id: 'quartz',
      name: 'Кварцы',
    },
    {
      id: 'switching',
      name: 'Коммутация',
    },

    {
      id: 'capacitors_non_polar',
      name: 'Конденсаторы неполярные',
    },
    {
      id: 'capacitors_polar',
      name: 'Конденсаторы полярные',
    },
    {
      id: 'fastener_down_conductor',
      name: 'Метизы и токоотводы',
    },
    {
      id: 'microchips',
      name: 'Микросхемы',
    },
    {
      id: 'power_modules',
      name: 'Модули силовые',
    },
    {
      id: 'optocouplers',
      name: 'Оптопары',
    },
    {
      id: 'coolers',
      name: 'Охладители',
    },
    {
      id: 'circuit_breakers',
      name: 'Предохранители',
    },
    {
      id: 'connectors',
      name: 'Разъёмы',
    },
    {
      id: 'resistors_variable',
      name: 'Резисторы переменные',
    },
    {
      id: 'resistors',
      name: 'Резисторы постоянные',
    },
    {
      id: 'relay',
      name: 'Рэле',
    },
    {
      id: 'thermistors',
      name: 'Терморезисторы',
    },
    {
      id: 'thyristors',
      name: 'Тиристоры',
    },
    {
      id: 'power_thyristors',
      name: 'Тиристоры силовые',
    },
    {
      id: 'bipolar_transistors',
      name: 'Транзисторы биполярные',
    },
    {
      id: 'field_transistors',
      name: 'Транзисторы полевые',
    },
    {
      id: 'power_transistors',
      name: 'Транзисторы силовые',
    },
    {
      id: 'shunts',
      name: 'Шунты',
    },
    {
      id: 'electrical_equipment',
      name: 'Электрооборудование',
    },
  ];
  const categoryCount = await prisma.category.count();
  if (categoryCount === 0) {
    for (const s of categories) {
      await prisma.category.upsert({
        where: { id: s.id },
        update: {},
        create: {
          id: s.id,
          name: s.name,
        },
      });
    }
  }
};
main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

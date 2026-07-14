import { Container, Typography, List, ListItem, Box } from "@mui/material";
import { ReactElement } from 'react';

interface SpecRowProps {
  label: string;
  value: string | string[];
}

const SpecRow = ({ label, value }: SpecRowProps): ReactElement => (
  <Box sx={{ mb: 1.5 }}>
    <Typography variant="body2" fontWeight={700}>
      {label}
    </Typography>
    {Array.isArray(value) ? (
      <List sx={{ listStyleType: 'disc', pl: 3, py: 0 }}>
        {value.map((line, idx) => (
          <ListItem key={idx} sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="body2">{line}</Typography>
          </ListItem>
        ))}
      </List>
    ) : (
      <Typography variant="body2">{value}</Typography>
    )}
  </Box>
);

export const Router = (): ReactElement => {
  return (
    <Container maxWidth="md">
      <Typography variant="h6" fontWeight={700} className="!mb-7">
        Гігабітний Wi-Fi роутер TP-Link Mercusys з функцією EasyMesh,
        (дводіапазонний)
      </Typography>

      <List sx={{ listStyleType: 'disc', pl: 4, py: 0 }}>
        <ListItem sx={{ display: 'list-item', p: 0, pb: 1 }}>
          <strong>Гігабітний Wi-Fi AC1200 –</strong> швидкість з'єднання до
          867 Мбіт/с в діапазоні 5 ГГц і до 300 Мбіт/с в діапазоні 2,4 ГГц.
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0, pb: 1 }}>
          <strong>Розширене покриття</strong> — завдяки чотирьом антенам з
          високим коефіцієнтом посилення і функції Beamforming стабільне
          Wi-Fi підключення буде у всьому будинку.
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0, pb: 1 }}>
          <strong>Гігабітні порти</strong> — в десять разів швидше портів
          стандарту Fast Ethernet, Mercusys MR30G передає дані на великій
          швидкості для будь-яких дротових пристроїв, включаючи ПК, IPTV та
          ігрові консолі.
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0, pb: 1 }}>
          <strong>Висока ефективність мережі</strong> — технологія MU-MIMO
          дозволяє MR30G взаємодіяти відразу з декількома пристроями, що
          збільшує загальну пропускну здатність мережі.
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0, pb: 1 }}>
          <strong>EasyMesh</strong> — технологія дозволяє створити єдину
          Mesh мережу у всьому будинку з пристроями з функцією EasyMesh.
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0, pb: 1 }}>
          <strong>Просте управління домашньою мережею через додаток</strong> —
          різноманітні функції, такі як батьківський контроль,
          пріоритизація (QoS) і гостьова мережа для підвищення безпеки та
          ефективності.
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0, pb: 1 }}>
          <strong>Підтримка IPTV</strong> — підтримка IGMP Proxy / Snooping,
          режиму "Міст" і тегування VLAN для оптимізації потоків IPTV.
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0 }}>
          <strong>Підтримка IPv6</strong> — дозволяє користуватися сервісами
          IPv6 провайдера і відвідувати сайти IPv6.
        </ListItem>
      </List>

      <Typography variant="body1" fontWeight={700} gutterBottom sx={{ mt: 3 }}>
        Характеристики:
      </Typography>

      <Typography variant="body2" fontWeight={700} sx={{ textTransform: 'uppercase', mb: 1.5 }}>
        Бездротова мережа
      </Typography>
      <SpecRow
        label="Бездротові стандарти"
        value={['5 ГГц: IEEE 802.11ac/n/a', '2,4 ГГц: IEEE 802.11b/g/n']}
      />
      <SpecRow label="Частота" value={['2,4 ГГц', '5 ГГц']} />
      <SpecRow
        label="Швидкість сигналу"
        value="До 867 Мбіт/с (5 ГГц) + до 300 Мбіт/с (2,4 ГГц)"
      />
      <SpecRow label="Сумісність зі стандартами Wi-Fi" value="11ac/a/b/g/n" />
      <SpecRow
        label="Чутливість прийому"
        value={[
          '11g 6 Мбіт/с: -96 дБм',
          '11g 54 Мбіт/с: -78 дБм',
          '11n HT40 MCS7: -74 дБм',
          '11n HT20 MCS7: -71 дБм',
          '11a 6 Мбіт/с: -97 дБм',
          '11a 54 Мбіт/с: -79 дБм',
          '11ac VHT20 MCS8: -74 дБм',
          '11ac VHT40 MCS9: -70 дБм',
          '11ac VHT80 MCS9: -65 дБм',
        ]}
      />
      <SpecRow label="Сила передачі" value="20 дБм або 100 мВт" />
      <SpecRow label="Захист бездротової мережі" value="WPA-PSK / WPA2-PSK" />
      <SpecRow label="Протокол Mesh" value="EasyMesh" />

      <Typography variant="body2" fontWeight={700} sx={{ textTransform: 'uppercase', mt: 3, mb: 1.5 }}>
        Програмне забезпечення
      </Typography>
      <SpecRow label="Режими роботи" value={['Роутер', 'Точка доступу']} />
      <SpecRow
        label="Тип WAN"
        value={[
          'Динамічна IP-адреса',
          'Статична IP-адреса',
          'PPPoE',
          'L2TP',
          'PPTP',
        ]}
      />
      <SpecRow
        label="Управління"
        value={['Контроль доступу', 'Локальне управління', 'Дистанційне управління']}
      />
      <SpecRow label="DHCP" value="Сервер, список DHCP-клієнтів" />
      <SpecRow
        label="NAT Forwarding"
        value={[
          'Переадресація портів',
          'Pапуск порті',
          'UPnP',
          'DMZ',
        ]}
      />
      <SpecRow
        label="Міжмережевий екран"
        value="Міжмережевий екран SPI, прив'язка IP- і MAC-адрес"
      />
      <SpecRow label="Гостьова мережа" value={['2,4 ГГц', '5 ГГц']} />

      <Typography variant="body2" fontWeight={700} sx={{ textTransform: 'uppercase', mt: 2, mb: 1.5 }}>
        Апаратне забезпечення
      </Typography>
      <SpecRow label="Розміри (ДхШхВ)" value="159,7 × 125,9 × 37,1 мм" />
      <SpecRow
        label="Інтерфейси"
        value="1 гігабітний порт WAN + 2 гігабітних порти LAN"
      />
      <SpecRow label="Кнопки" value="WPS/Reset (WPS/Скидання налаштувань)" />
      <SpecRow
        label="Кількість антен"
        value="4 фіксовані всеспрямовані антени 5 дБі"
      />

      <Typography variant="body2" fontWeight={700} sx={{ textTransform: 'uppercase', mt: 2, mb: 1.5 }}>
        Додаткова інформація
      </Typography>
      <SpecRow
        label="Комплект постачання"
        value={[
          'Wi-Fi роутер (MR30G)',
          'Адаптер живлення',
          'Посібник по швидкому налаштуванню',
          'Кабель Ethernet RJ45',
        ]}
      />
    </Container>
  );
};

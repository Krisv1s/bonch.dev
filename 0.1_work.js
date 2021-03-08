function bonchHomeWork(num) {
  for (let i = 0; i < num; i += 1) {
    switch (i) {
      case 5:
        console.log('пять');
        break;
      case 13:
        console.log('тринадцать');
        break;
      case 22:
        console.log('двадцать два');
        break;
      case 35:
        console.log('тридцать пять');
        break;
      case 98:
        console.log('девяносто восемь');
        break;
      default:
        console.log(i);
    }
  }
}

bonchHomeWork(15);

bonchHomeWork(5);

bonchHomeWork(98);

bonchHomeWork(124);

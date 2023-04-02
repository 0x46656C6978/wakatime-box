export default function formatLine(name: string, total_seconds: number, percent: number, use_old_format: boolean) {

  if (use_old_format) {
    return [
      cutStr(formatName(name), 10).padEnd(10),
      '🕓' + convertSeconds(total_seconds).padEnd(9),
      '('+String(percent.toFixed(1)).padStart(7) + '%)',
    ].join(' ');
  }

  return [
    cutStr(formatName(name), 10).padEnd(15, '.'),
    (convertSeconds(total_seconds) + ' ').padEnd(8, '.'),

  ].join(' ') + String(percent.toFixed(1)).padStart(29, '.') + '%';
}

function convertSeconds(seconds: number) {
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  const minutes = Math.floor(seconds / (60));
  seconds -= minutes * (60);

  seconds = Math.round(seconds);
  const result = '';

  if (days > 0) {
    return result + days + 'd ' + hours + 'h';
  }
  if (hours > 0) {
    return result + hours + 'h ' + minutes + 'm';
  }
  if (minutes > 0) {
    return result + minutes + 'm ' + seconds + 's';
  }
  return result + seconds + 's';
}

function cutStr(str: string, len: number) {
  return str.length > len ? str.substring(0, len - 3) + '...' : str;
}

function formatName(name: string) {
  if (name === 'Blade Template') {
    return 'Blade';
  }
  return name;
}

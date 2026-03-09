/**
 * Преобразует имя иконки (snake_case, kebab-case) в имя компонента (PascalCase с префиксом Icon).
 * Используется для единого именования компонентов иконок без смены API (name остаётся как есть).
 *
 * @example
 * iconNameToComponentName('alert_solid') // 'IconAlertSolid'
 * iconNameToComponentName('arrow-stats-down') // 'IconArrowStatsDown'
 * iconNameToComponentName('checkbox--checked') // 'IconCheckboxChecked'
 * iconNameToComponentName('eWallet') // 'IconEWallet'
 */
export function iconNameToComponentName(name: string): string {
  const parts = name.split(/[-_]+/).filter(Boolean)
  const pascal = parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
  return `Icon${pascal}`
}

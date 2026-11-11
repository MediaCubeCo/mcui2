/**
 * Блокировка прокрутки страницы под модалками и дроверами — одна на всех.
 *
 * Каждый контейнер (модалки, дроверы) держит свой «замок» по имени, и страница не прокручивается,
 * пока занят хоть один. Раньше прокрутку блокировали только модалки, причём писали `body.style`
 * напрямую: под открытым дровером страница прокручивалась колесом над затемнением и прокруткой,
 * дошедшей до края дровера, а будь блокировка у обоих по отдельности — модалка, закрытая поверх
 * дровера, снимала бы её и у дровера.
 *
 * Отступ справа — ширина пропавшей полосы прокрутки: без него страница под затемнением сдвигается
 * вбок на её ширину. Прежние значения стилей body возвращаются, когда последний замок снят.
 */
const holders = new Set<string>()
let saved: { overflow: string; paddingRight: string } | null = null

export function setBodyScrollLock(owner: string, locked: boolean): void {
  if (typeof window === 'undefined') return

  const wasLocked = holders.size > 0
  if (locked) holders.add(owner)
  else holders.delete(owner)
  const isLocked = holders.size > 0
  if (isLocked === wasLocked) return

  const { body, documentElement } = document
  if (isLocked) {
    const scrollbarWidth = Math.max(0, window.innerWidth - documentElement.clientWidth)
    saved = { overflow: body.style.overflow, paddingRight: body.style.paddingRight }
    body.style.overflow = 'hidden'
    body.style.paddingRight = `${scrollbarWidth}px`
  } else {
    body.style.overflow = saved?.overflow ?? ''
    body.style.paddingRight = saved?.paddingRight ?? ''
    saved = null
  }
}

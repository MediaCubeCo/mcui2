import { Colors, ColorTypes } from '@/types'

export interface ColorTheme {
  components: {
    badge: {
      variation: ColorTypes | string
    }
    button: {
      variation: ColorTypes | string
    }
    chip: {
      variation: ColorTypes | string
      textColor: ColorTypes | string
    }
    cropper: {
      color: ColorTypes | string
    }
    datepicker: {
      color: ColorTypes | string
    }
    draggable: {
      variation: ColorTypes | string
    }
    checkbox: {
      color: ColorTypes | string
    }
    radio: {
      color: ColorTypes | string
    }
    range: {
      color: ColorTypes | string
    }
    select: {
      color: ColorTypes | string
      selected: ColorTypes | string
    }
    fieldText: {
      color: ColorTypes | string
    }
    fieldToggle: {
      color: ColorTypes | string
      bg: ColorTypes | string
    }
    bottomLoader: {
      border: ColorTypes | string
    }
    noData: {
      link: ColorTypes | string
    }
    notification: {
      variation: ColorTypes | string
    }
    progress: {
      color: ColorTypes | string
      helpText: ColorTypes | string
    }
    separator: {
      color: ColorTypes | string
    }
    spinDigit: {
      color: ColorTypes | string
    }
    spinNumber: {
      color: ColorTypes | string
    }
    title: {
      color: ColorTypes | string
    }
    tooltip: {
      color: ColorTypes | string
      textColor: ColorTypes | string
    }
    dropdown: {
      itemColor: ColorTypes | string
    }
    filter: {
      color: ColorTypes | string
      chipColor: ColorTypes | string
      button: ColorTypes | string
    }
    overlay: {
      bg: ColorTypes | string
      border: ColorTypes | string
    }
    sidebar: {
      chip: ColorTypes | string
      activeLink: ColorTypes | string
    }
    tab: {
      count: ColorTypes | string
    }
    tabs: {
      color: ColorTypes | string
      accentColor: ColorTypes | string
    }
    tableCard: {
      backLink: ColorTypes | string
    }
    toast: {
      variation: ColorTypes | string
    }
  }
}

export interface ColorThemes {
  light: ColorTheme
  dark: ColorTheme
}

export const ThemesColors = Colors

export const UiThemes: ColorThemes = {
  light: {
    components: {
      avatar: {
        defaultIcon: 'main'
      },
      badge: {
        variation: 'main'
      },
      button: {
        variation: 'main',
        activeTextColor: 'main'
      },
      chip: {
        variation: 'transparent',
        textColor: 'black'
      },
      cropper: {
        color: 'main'
      },
      datepicker: {
        color: 'main'
      },
      draggable: {
        variation: 'main'
      },
      checkbox: {
        color: 'main'
      },
      radio: {
        color: 'main'
      },
      range: {
        color: 'main'
      },
      select: {
        color: 'main',
        selected: 'main-lighter'
      },
      fieldText: {
        color: 'main'
      },
      fieldToggle: {
        color: 'main',
        bg: 'main-light'
      },
      bottomLoader: {
        border: 'main'
      },
      noData: {
        link: 'main'
      },
      notification: {
        variation: 'main'
      },
      progress: {
        color: 'main',
        helpText: 'main'
      },
      separator: {
        color: 'outline-gray'
      },
      spinDigit: {
        color: 'main'
      },
      spinNumber: {
        color: 'main'
      },
      title: {
        color: 'black'
      },
      tooltip: {
        color: 'black',
        textColor: 'white'
      },
      dropdown: {
        itemColor: 'main',
        itemBgColor: 'lighter-purple'
      },
      filter: {
        color: 'main',
        chipColor: 'main',
        button: 'main'
      },
      overlay: {
        bg: 'white',
        border: 'main'
      },
      sidebar: {
        chip: 'main',
        activeLink: 'main'
      },
      tab: {
        count: 'black'
      },
      tabs: {
        color: 'black',
        accentColor: 'main'
      },
      tableCard: {
        backLink: 'main'
      },
      toast: {
        variation: 'white'
      }
    }
  } as ColorTheme,
  dark: {
    components: {
      avatar: {
        defaultIcon: 'main'
      },
      badge: {
        variation: 'main'
      },
      button: {
        variation: 'main'
      },
      chip: {
        variation: 'transparent',
        textColor: 'black'
      },
      cropper: {
        color: 'main'
      },
      datepicker: {
        color: 'main'
      },
      draggable: {
        variation: 'main'
      },
      checkbox: {
        color: 'main'
      },
      radio: {
        color: 'main'
      },
      range: {
        color: 'main'
      },
      select: {
        color: 'main',
        selected: 'main-lighter'
      },
      fieldText: {
        color: 'main'
      },
      fieldToggle: {
        color: 'main',
        bg: 'main-light'
      },
      bottomLoader: {
        border: 'main'
      },
      noData: {
        link: 'main'
      },
      notification: {
        variation: 'main'
      },
      progress: {
        color: 'main',
        helpText: 'main'
      },
      separator: {
        color: 'outline-gray'
      },
      spinDigit: {
        color: 'main'
      },
      spinNumber: {
        color: 'main'
      },
      title: {
        color: 'black'
      },
      tooltip: {
        color: 'black',
        textColor: 'white'
      },
      dropdown: {
        itemColor: 'main',
        itemBgColor: 'lighter-purple'
      },
      filter: {
        color: 'main',
        chipColor: 'main',
        button: 'main'
      },
      overlay: {
        bg: 'white',
        border: 'main'
      },
      sidebar: {
        chip: 'main',
        activeLink: 'main'
      },
      tab: {
        count: 'black'
      },
      tabs: {
        color: 'black',
        accentColor: 'main'
      },
      tableCard: {
        backLink: 'main'
      },
      toast: {
        variation: 'white'
      }
    }
  } as ColorTheme
}

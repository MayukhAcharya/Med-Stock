type fontObj = {
  fontFamily: string;
};

type Fonts = {
  light: fontObj;
  regular: fontObj;
  medium: fontObj;
  semiBold: fontObj;
  bold: fontObj;
};

export const fonts: Fonts = {
  light: {
    fontFamily: 'PlusJakartaSans-Light', //300 or lower
  },
  regular: {
    fontFamily: 'PlusJakartaSans-Regular', //400
  },
  medium: {
    fontFamily: 'PlusJakartaSans-Medium', //500
  },
  semiBold: {
    fontFamily: 'PlusJakartaSans-SemiBold', //600
  },
  bold: {
    fontFamily: 'PlusJakartaSans-Bold', //700 or higher
  },
};

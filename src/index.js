import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Icon from '@expo/vector-icons';

// Browsers’ default :focus ring on web; RN Web may not map a single `outline: 'none'` to all cases.
const webNoFocusRing = Platform.OS === 'web' ? { outlineStyle: 'none', outlineWidth: 0 } : {};

// Helper for nested API
export function flattenGroupedOptions(groups) {
  if (!Array.isArray(groups)) return [];
  return groups.flatMap(group => [
    { type: 'group', label: group.label },
    ...group.options.map(o => ({ ...o, type: 'option' })),
  ]);
}

// iOS: without this `Modal` gets default only portrait on iPhone. When opening list (and keyboard) system returns to portrait despite `orientation: "all"` in app.
const IOS_MODAL_SUPPORTED_ORIENTATIONS = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

export const COLOR_PRESETS = {
  light: {
    primary: '#FFFFFF',
    secondary: '#666666',
    colorTextPrimary: '#000000',
    colorTextSecondary: '#888888',
    // border: '#AAAAAA', // explicit border color - different from lines (here the same, but explicitly)
    lines: '#CCCCCC', // lines - overrides border if border is not set
    disabled: '#F0F0F0',
    shadow: '#000000',
    selected: '#EEF2FF',
  },
  dark: {
    primary: '#000000',
    secondary: '#999999',
    colorTextPrimary: '#FFFFFF',
    colorTextSecondary: '#888888',
    // border: '#111111',
    lines: '#333333',
    disabled: '#1A1A1A',
    shadow: '#FFFFFF',
    selected: '#334155',
  },
};

// Default sizes — overridden by prop `sizes` (merge with below).
export const DEFAULT_SIZES = {
  triggerMinWidth: 180,
  itemHeight: 50,
  maxListWidth: 600,
  maxListHeight: undefined,
  separatorWidth: StyleSheet.hairlineWidth,
  borderRadius: 15,
  borderWidth: StyleSheet.hairlineWidth,
  iconSize: 24,
  inputPaddingLeft: 15,
  inputPaddingRight: 5,
  itemPaddingHorizontal: 15,
};

// Default typography — overridden by prop `typography` (merge with below).
export const DEFAULT_TYPOGRAPHY = {
  fontSize: 16,
  fontFamily: undefined,
};

// Default icons (names Ionicons) — overridden by prop `icons` (merge with below).
export const DEFAULT_ICONS = {
  chevron: 'chevron-down',
  close: 'close',
};

// Safe range for itemHeight — below 35 Android breaks layout TextInput inside searchbar.
export const MIN_OPTION_HEIGHT = 35;
export const MAX_OPTION_HEIGHT = 70;

// Local helper components — eliminate duplicated JSX between trigger and modal header
function IconButton({ iconName, iconSize, onPress, color, disabled, pressedOpacity }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        staticStyles.iconButton,
        { opacity: pressed ? pressedOpacity : 1 },
      ]}
    >
      <Icon.Ionicons name={iconName} size={iconSize} color={color} />
    </Pressable>
  );
}

function VerticalDivider({ width, color }) {
  return <View style={{ width, backgroundColor: color, height: 25 }} />;
}

export default function ReactNativeSelect({
  // Data
  options = [],
  value,
  onChange,
  placeholder = '',
  placeholderText = 'No results',

  // Behavior
  /// 'fade' | 'slide' | 'none'
  animationType = 'fade', /// 'fade' | 'slide' | 'none'
  cursorColor = null,
  transparent = true,
  clearable = false,
  searchable = false,
  autoFocus = true, // ios: autofocus, android: onShow workaround
  disabled = false,
  pressedOpacity = 0.6, // used in style={({ pressed }) => ...} on all Pressable
  hideDivider = false, // hides vertical separator between buttons and chevron
  hideItemSeparator = false, // hides horizontal separators between items on the list
  itemLabelSingleLine = false, // When true, the label of the option on the list is one line with ellipsis (without wrapping in vertical).
  autoCorrect = false,
  spellCheck = false, // When enabled, the first click on the cross may not work (clearing)

  // Render props (optional full replacement of elements)
  renderTrigger, // Render props (optional full replacement of elements)
  renderGroupHeader, // renderGroupHeader={({ item }) => <View>...</View>}  — optional replacement of group header

  // Design tokens
  theme = 'light',
  colors: colorsProp = {},
  sizes: sizesProp = {},
  typography: typographyProp = {},
  icons: iconsProp = {},

  // Escape hatche (additive overrides of style)
  triggerStyle,
  dropdownStyle,
  itemStyle,
  groupHeaderStyle,
}) {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [flatListMountId, setFlatListMountId] = useState(0);

  const buttonRef = useRef(null);
  const searchInputRef = useRef(null);
  const optionsListRef = useRef(null);
  const insets = useSafeAreaInsets();

  const scrollToSelectedOnOpen = false; //! does not work correctly when true on android (text disappears from the list).

  // Merged memo: all tokens + dynamic styles in one place.
  const { colors, sizes, typography, icons, borderColor, styles } = useMemo(() => {
    const colors = {
      ...(theme === 'dark' ? COLOR_PRESETS.dark : COLOR_PRESETS.light),
      ...colorsProp,
    };
    const rawSizes = { ...DEFAULT_SIZES, ...sizesProp };
    const clampedHeight = Math.min(MAX_OPTION_HEIGHT, Math.max(MIN_OPTION_HEIGHT, rawSizes.itemHeight)); // Clamp itemHeight — below MIN Android breaks layout TextInput in searchbar.
    // if (__DEV__ && clampedHeight !== rawSizes.itemHeight) {
    // console.warn(`ReactNativeSelect: itemHeight (${rawSizes.itemHeight}) out of range [${MIN_OPTION_HEIGHT}, ${MAX_OPTION_HEIGHT}]. Used ${clampedHeight}.`);
    // }
    const sizes = { ...rawSizes, itemHeight: clampedHeight };
    const typography = { ...DEFAULT_TYPOGRAPHY, ...typographyProp };
    const icons = { ...DEFAULT_ICONS, ...iconsProp };
    const borderColor = colors.border ?? colors.lines; // `colors.border` as optional override of borderColor; fallback to `colors.lines`

    return {
      colors,
      sizes,
      typography,
      icons,
      borderColor,
      styles: buildStyles({ colors, sizes, typography, borderColor }),
    };
  }, [theme, colorsProp, sizesProp, typographyProp, iconsProp]);

  const toggleDropdown = () => {
    if (!visible) {
      setSearchText('');
      if (scrollToSelectedOnOpen) setFlatListMountId((id) => id + 1);
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleFocus = () => {
    //* autofocus
    // workaround for android problem that does not allow automatic focus on input when opening modal
    // important is also adding this condition - autoFocus={Platform.OS == 'ios' ? autoFocus : false}
    if (searchable && Platform.OS === 'android') {
      const timeout = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(timeout);
    }
  };

  // Filtering with group handling
  // When searching is active, group headers (type: 'group') are kept
  // only if at least one of their options matches the search phrase.
  // Groups without any matching children are completely skipped.
  // Items without `type` are treated as 'option' (backward compatibility).
  const filteredOptions = useMemo(() => {
    if (!searchable || searchText.length === 0) return options;

    const query = searchText.toLowerCase();
    const result = [];
    let pendingGroup = null;

    for (const item of options) {
      if (item.type === 'group') {
        // Keep group in buffer — will be added only when a matching option is found
        pendingGroup = item;
      } else {
        // No type or type === 'option' → clickable element
        if (item.label.toLowerCase().includes(query)) {
          if (pendingGroup) {
            result.push(pendingGroup); // flush group before the first matching option
            pendingGroup = null;
          }
          result.push(item);
        }
      }
    }

    return result;
  }, [options, searchable, searchText]);

  // options.find skips groups naturally — they do not have the `value` field
  const selectedLabel =
    options.find((opt) => opt.type !== 'group' && opt.value === value)?.label || placeholder;

  const selectedIndexForInitialScroll = useMemo(() => {
    if (!scrollToSelectedOnOpen || value == null) return null;
    const idx = filteredOptions.findIndex((o) => o.type !== 'group' && o.value === value);
    return idx >= 0 ? idx : null;
  }, [scrollToSelectedOnOpen, value, filteredOptions]);

  const separator = (
    <View style={{ height: sizes.separatorWidth, backgroundColor: colors.lines }} />
  );

  // Common props for IconButton — to avoid repeating iconSize and pressedOpacity for each use
  const iconProps = { iconSize: sizes.iconSize, pressedOpacity, color: colors.secondary };

  // Render clear button — own by render prop or default IconButton
  const clearButton = (onPress) =>
    <IconButton {...iconProps} iconName={icons.close} onPress={onPress} />;

  // Render modal
  // Web: other UI (e.g. headers, drawers) with high z-index can sit above a Modal subtree unless the root is raised.
  const modalRootStyle = [
    { flex: 1 },
    Platform.OS === 'web' && { zIndex: 10000 },
  ];

  const modal = (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={() => setVisible(false)}
      onShow={handleFocus}
      supportedOrientations={
        Platform.OS === 'ios' ? IOS_MODAL_SUPPORTED_ORIENTATIONS : undefined
      }
    >
      <View style={modalRootStyle}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setVisible(false)} />

        <View
          style={{
            flex: 1,
            marginTop: insets.top + 5,
            marginBottom: insets.bottom + 5,
            marginHorizontal: 10,
          }}
          pointerEvents="box-none"
        >
          <View style={styles.shadowWrapper}>
            <View style={[styles.dropdownList, dropdownStyle]}>

              {/* Header modal — searchbar with buttons */}
              <View style={styles.searchBar}>
                <View style={{ flex: 1 }}>
                  {!searchText && (
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      pointerEvents="none"
                      style={[
                        styles.textInputStyle,
                        {
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          color: value ? colors.colorTextPrimary : colors.colorTextSecondary,
                          paddingVertical: 0,
                          lineHeight: sizes.itemHeight,
                        },
                      ]}
                    >
                      {selectedLabel}
                    </Text>
                  )}
                  <TextInput
                    ref={searchInputRef}
                    autoFocus={searchable && Platform.OS === 'ios' ? autoFocus : false}
                    style={[styles.textInputStyle, { color: colors.colorTextPrimary }]}
                    editable={searchable && !disabled}
                    placeholder=""
                    value={searchText}
                    onChangeText={setSearchText}
                    multiline={false}
                    numberOfLines={1}
                    autoCorrect={autoCorrect}
                    spellCheck={spellCheck}
                    cursorColor={cursorColor}
                  />
                </View>
                {clearable && (searchText.length > 0 || value) &&
                  clearButton(() => {
                    if (searchText.length > 0) setSearchText('');
                    else { onChange(''); setVisible(false); }
                  })
                }
                {!hideDivider && <VerticalDivider width={StyleSheet.hairlineWidth} color={colors.lines} />}
                <IconButton
                  {...iconProps}
                  iconName={icons.chevron}
                  onPress={() => setVisible(false)}
                />
                <View style={{ width: sizes.inputPaddingRight }} />
              </View>

              <View style={{ height: sizes.separatorWidth, backgroundColor: colors.lines }} />

              <FlatList
                key={scrollToSelectedOnOpen ? `opts-${flatListMountId}` : 'opts'}
                ref={optionsListRef}
                data={filteredOptions}
                keyExtractor={(item) =>
                  item.type === 'group'
                    ? `group__${item.label}`
                    : item.value.toString()
                }
                initialScrollIndex={
                  scrollToSelectedOnOpen &&
                    selectedIndexForInitialScroll != null &&
                    filteredOptions.length > selectedIndexForInitialScroll
                    ? selectedIndexForInitialScroll
                    : undefined
                }
                getItemLayout={
                  scrollToSelectedOnOpen
                    ? (_data, index) => ({
                      length: sizes.itemHeight,
                      offset: index * (sizes.itemHeight + sizes.separatorWidth),
                      index,
                    })
                    : undefined
                }
                onScrollToIndexFailed={({ index }) => {
                  setTimeout(() => {
                    optionsListRef.current?.scrollToIndex({
                      index,
                      animated: false,
                      viewPosition: 0.35,
                    });
                  }, 120);
                }}
                renderItem={({ item }) => {
                  // Group header
                  if (item.type === 'group') {
                    if (renderGroupHeader) {
                      return renderGroupHeader({ item });
                    }
                    return (
                      <View style={[styles.groupHeader, groupHeaderStyle]}>
                        <Text style={styles.groupHeaderText}>{item.label}</Text>
                      </View>
                    );
                  }

                  // Clickable element
                  return (
                    <Pressable
                      onPress={() => { onChange(item); setSearchText(''); setVisible(false); }}
                      style={({ pressed }) => [
                        styles.option,
                        item.value === value && styles.optionSelected,
                        { opacity: pressed ? pressedOpacity : 1 },
                        itemStyle,
                      ]}
                    >
                      <Text
                        style={styles.optionText}
                        numberOfLines={itemLabelSingleLine ? 1 : undefined}
                        ellipsizeMode={itemLabelSingleLine ? 'tail' : undefined}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                }}
                ItemSeparatorComponent={
                  hideItemSeparator
                    ? null
                    : ({ leadingItem }) =>
                      // No separator under group header — looks better without double line
                      leadingItem?.type === 'group' ? null : separator
                }
                ListEmptyComponent={() => (
                  <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={{ color: colors.colorTextSecondary, fontSize: typography.fontSize }}>
                      {placeholderText}
                    </Text>
                  </View>
                )}
                nestedScrollEnabled
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  // If renderTrigger is passed — full replacement of trigger; component does not render its own Pressable.
  if (renderTrigger) {
    return (
      <View>
        {renderTrigger({ onPress: toggleDropdown, disabled, selectedLabel, hasValue: !!value, onClear: () => { onChange(''); setVisible(false); } })}
        {modal}
      </View>
    );
  }

  return (
    <View>
      {/* Trigger (default) */}
      <Pressable
        ref={buttonRef}
        disabled={disabled}
        onPress={toggleDropdown}
        style={({ pressed }) => [
          styles.selectStyle,
          { backgroundColor: disabled ? colors.disabled : colors.primary },
          { opacity: pressed ? pressedOpacity : 1 },
          triggerStyle,
        ]}
      >
        <View style={styles.searchBar}>
          <Text
            numberOfLines={1}
            style={[
              styles.textInputStyle,
              {
                color: value ? colors.colorTextPrimary : colors.colorTextSecondary,
                paddingVertical: 0,
                lineHeight: sizes.itemHeight,
              },
            ]}
          >
            {selectedLabel}
          </Text>
          {!value && <View style={{ width: 5 }} />}
          {clearable && !disabled && value &&
            clearButton(() => { onChange(''); setVisible(false); })
          }
          {!hideDivider && <VerticalDivider width={StyleSheet.hairlineWidth} color={colors.lines} />}
          <IconButton
            {...iconProps}
            iconName={icons.chevron}
            disabled={disabled}
            onPress={toggleDropdown}
          />
          <View style={{ width: sizes.inputPaddingRight }} />
        </View>
      </Pressable>

      {modal}
    </View>
  );
}

// Static styles (independent of theme) — created once when loading module
const staticStyles = StyleSheet.create({
  iconButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...webNoFocusRing,
  },
});

// Dynamic styles (dependent on theme) — called inside useMemo
function buildStyles({ colors, sizes, typography, borderColor }) {
  return StyleSheet.create({
    selectStyle: {
      minWidth: sizes.triggerMinWidth,
      borderRadius: sizes.borderRadius,
      backgroundColor: colors.primary,
      borderWidth: sizes.borderWidth,
      borderColor,
      ...webNoFocusRing,
    },
    textInputStyle: {
      flex: 1,
      fontSize: typography.fontSize,
      fontFamily: typography.fontFamily,
      paddingVertical: 10,
      paddingLeft: sizes.inputPaddingLeft,
      minHeight: sizes.itemHeight,
      textAlignVertical: 'center',
      textAlign: 'auto',
      lineHeight: undefined,
      ...webNoFocusRing,
    },
    shadowWrapper: {
      flex: 1,
      borderRadius: sizes.borderRadius,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      maxWidth: sizes.maxListWidth,
      width: '100%',
      maxHeight: sizes.maxListHeight,
      alignSelf: 'center',
    },
    dropdownList: {
      flex: 1,
      borderRadius: sizes.borderRadius,
      overflow: 'hidden',
      backgroundColor: colors.primary,
      borderWidth: sizes.borderWidth,
      borderColor,
      maxWidth: sizes.maxListWidth,
      width: '100%',
      maxHeight: sizes.maxListHeight,
      alignSelf: 'center',
    },
    searchBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: sizes.itemHeight,
    },
    option: {
      paddingHorizontal: sizes.itemPaddingHorizontal,
      paddingVertical: 7,
      minHeight: sizes.itemHeight,
      justifyContent: 'center',
      ...webNoFocusRing,
    },
    optionSelected: {
      backgroundColor: colors.selected,
    },
    optionText: {
      fontSize: typography.fontSize,
      fontFamily: typography.fontFamily,
      color: colors.colorTextPrimary,
    },
    // Grouping
    groupHeader: {
      paddingHorizontal: sizes.itemPaddingHorizontal,
      paddingTop: 12,
      paddingBottom: 4,
      minHeight: 32,
      justifyContent: 'flex-end',
    },
    groupHeaderText: {
      fontSize: typography.fontSize * 0.78,
      fontFamily: typography.fontFamily,
      color: colors.colorTextSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      fontWeight: '600',
    },
  });
}

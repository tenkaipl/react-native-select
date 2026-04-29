import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Icon from '@expo/vector-icons';
import { CATEGORY_OPTIONS, CITY_OPTIONS, FRUITS_AND_VEGGIES_FLATTENED, FRUITS_AND_VEGGIES_NESTED, LOREM_IPSUM_OPTIONS, MIXED_OPTIONS, MONTH_OPTIONS, STATUS_OPTIONS } from '../components/TestData';
import ReactNativeSelect, { flattenGroupedOptions } from '@tenkai-pl/react-native-select';

export default function DemoScreen() {
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(1);

  //* PAGE 1
  const [v1, setV1] = useState(null);
  const [v2, setV2] = useState(null);
  const [v3, setV3] = useState(null);
  const [month, setMonth] = useState(null);
  const [v4, setV4] = useState(null);
  const [v5, setV5] = useState('locked');
  const [v6, setV6] = useState(null);
  const [v7, setV7] = useState(null);

  //* PAGE 2
  const [v10, setV10] = useState(null);
  const [v11, setV11] = useState(null);
  const [v12, setV12] = useState(null);
  const [v13, setV13] = useState(null);
  const [v14, setV14] = useState(null);

  //* PAGE 3
  const [v20, setV20] = useState(null);
  const [v21, setV21] = useState(null);
  const [v22, setV22] = useState(null);
  const [v23, setV23] = useState(null);
  const [v24, setV24] = useState(null);
  const [v25, setV25] = useState(null);

  //* PAGE 4
  const [v30, setV30] = useState(null);
  const [v31, setV31] = useState(null);
  const [v32, setV32] = useState(null);
  const [v33, setV33] = useState(null);
  const [v34, setV34] = useState(null);
  const [v35, setV35] = useState(null);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top, paddingBottom: insets.bottom, },]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={{ height: 15 }}></View>

      <Text style={styles.headline}>React Native Select</Text>

      <View style={{ height: 10 }} />

      <Text style={styles.lead}>
        Demo of React Native Select component.
      </Text>
      <Text style={styles.lead}>
        Built by <Text style={{ fontWeight: 'bold' }}>Tenkai</Text>
      </Text>

      {/* <View style={{ height: 15 }}></View> */}
      <View style={{ height: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10 }}>
        <Pressable style={[styles.badge, page === 1 && styles.badgeActive]} onPress={() => setPage(1)}>
          <Text style={[styles.lead, page === 1 && styles.badgeTextActive]}>Default</Text>
        </Pressable>
        <Pressable style={[styles.badge, page === 2 && styles.badgeActive]} onPress={() => setPage(2)}>
          <Text style={[styles.lead, page === 2 && styles.badgeTextActive]}>Custom</Text>
        </Pressable>
        <Pressable style={[styles.badge, page === 3 && styles.badgeActive]} onPress={() => setPage(3)}>
          <Text style={[styles.lead, page === 3 && styles.badgeTextActive]}>Special</Text>
        </Pressable>
        <Pressable style={[styles.badge, page === 4 && styles.badgeActive]} onPress={() => setPage(4)}>
          <Text style={[styles.lead, page === 4 && styles.badgeTextActive]}>Trigger</Text>
        </Pressable>
      </View>
      <View style={{ height: 10 }} />



      <View style={[styles.card, page === 2 && styles.cardTransparent, page === 3 && styles.cardTransparent, page === 4 && styles.cardTransparent]}>

        {page === 1 && (
          <>
            <Text style={styles.fieldLabel}>Select</Text>
            <ReactNativeSelect
              options={CITY_OPTIONS}
              value={v1}
              onChange={(item) => setV1(item.value)}
              placeholder="Select city…"
            />

            <View style={{ height: 25 }}></View>

            <Text style={styles.fieldLabel}>Clearable</Text>
            <ReactNativeSelect
              options={MIXED_OPTIONS}
              value={v2}
              onChange={(item) => setV2(item.value)}
              placeholder="Select…"
              theme="light"
              clearable
              animationType="slide"
            />

            <View style={{ height: 25 }}></View>

            <Text style={styles.fieldLabel}>Searchable</Text>
            <ReactNativeSelect
              options={MONTH_OPTIONS}
              // value={v3}
              // onChange={(item) => setV3(item.value)}
              value={month}
              onChange={(item) => setMonth(item.value)}
              placeholder="Select…"
              searchable
              clearable
            // sizes={{
            //   maxListWidth: 600,
            //   maxListHeight: 600
            // }}
            />

            <View style={{ height: 25 }}></View>

            <Text style={styles.fieldLabel}>Grouped</Text>
            <ReactNativeSelect
              options={FRUITS_AND_VEGGIES_FLATTENED}
              value={v4}
              onChange={(item) => setV4(item.value)}
              placeholder="Select…"
              theme="light"
              searchable
              autoFocus={false}
              clearable
              animationType="none"
            />

            {/* <View style={{ height: 25 }}></View>

            <Text style={styles.fieldLabel}>Emoji</Text>
            <ReactNativeSelect
              options={STATUS_OPTIONS}
              value={v5}
              onChange={(item) => setV5(item.value)}
              placeholder="Select…"
              theme="light"
              searchable
              clearable
            /> */}

            <View style={{ height: 25 }}></View>

            <Text style={styles.fieldLabel}>Disabled</Text>
            <ReactNativeSelect
              options={STATUS_OPTIONS}
              value={v6}
              onChange={(item) => setV6(item.value)}
              placeholder="Select is disabled…"
              theme="light"
              searchable
              clearable
              disabled={true}
            />

            <View style={{ height: 25 }}></View>

            <Text style={styles.fieldLabel}>Dark theme</Text>
            <ReactNativeSelect
              options={CATEGORY_OPTIONS}
              value={v7}
              onChange={(item) => setV7(item.value)}
              placeholder="Select category…"
              theme="dark"
              clearable
              searchable
            />
          </>
        )}

        {page === 2 && (
          <>
            {/* Rose */}
            <View style={[styles.variant, { backgroundColor: THEMES.rose.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.rose.titleColor }]}>Rose</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS}
                value={v10}
                onChange={(item) => setV10(item.value)}
                placeholder="Select…"
                searchable
                clearable
                colors={THEMES.rose.selectColors}
                sizes={THEMES.rose.sizes}
              />
            </View>

            {/* Ambient */}
            <View style={[styles.variant, { backgroundColor: THEMES.ambient.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.ambient.titleColor }]}>Ambient</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS}
                value={v11}
                onChange={(item) => setV11(item.value)}
                placeholder="Select…"
                searchable
                clearable
                colors={THEMES.ambient.selectColors}
                sizes={THEMES.ambient.sizes}
              />
            </View>

            {/* Emerald */}
            <View style={[styles.variant, { backgroundColor: THEMES.emerald.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.emerald.titleColor }]}>Emerald</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS}
                value={v12}
                onChange={(item) => setV12(item.value)}
                placeholder="Select…"
                searchable
                clearable
                colors={THEMES.emerald.selectColors}
                sizes={THEMES.emerald.sizes}
              />
            </View>

            {/* Ocean */}
            <View style={[styles.variant, { backgroundColor: THEMES.ocean.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.ocean.titleColor }]}>Ocean</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS}
                value={v13}
                onChange={(item) => setV13(item.value)}
                placeholder="Select…"
                searchable
                clearable
                colors={THEMES.ocean.selectColors}
                sizes={THEMES.ocean.sizes}
              />
            </View>

            {/* Midnight */}
            <View style={[styles.variant, { backgroundColor: THEMES.midnight.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.midnight.titleColor }]}>Midnight</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS}
                value={v14}
                onChange={(item) => setV14(item.value)}
                placeholder="Select…"
                searchable
                clearable
                colors={THEMES.midnight.selectColors}
                sizes={THEMES.midnight.sizes}
              />
            </View>
          </>
        )}

        {page === 3 && (
          <>
            {/* Seaside */}
            <View style={[styles.variant, { backgroundColor: THEMES.seaside.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.seaside.titleColor }]}>Seaside</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS}
                value={v20}
                onChange={(item) => setV20(item.value)}
                placeholder="Choose a sea breeze…"
                searchable
                clearable
                colors={THEMES.seaside.selectColors}
                sizes={THEMES.seaside.sizes}
                typography={THEMES.seaside.typography}
                icons={THEMES.seaside.icons}
                pressedOpacity={0.4}
                itemLabelSingleLine
              />
            </View>

            {/* Menu */}
            <View style={[styles.variant, { backgroundColor: THEMES.menu.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.menu.titleColor }]}>Menu (custom group header)</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={flattenGroupedOptions(FRUITS_AND_VEGGIES_NESTED)}
                value={v21}
                onChange={(item) => setV21(item.value)}
                placeholder="— Select from the menu —"
                searchable
                clearable
                colors={THEMES.menu.selectColors}
                sizes={THEMES.menu.sizes}
                typography={THEMES.menu.typography}
                icons={THEMES.menu.icons}
                pressedOpacity={0.4}
                hideDivider={true}
                hideItemSeparator={true}
                renderGroupHeader={({ item }) => (
                  <View style={styles.customGroupHeader}>
                    <View style={styles.customGroupHeaderLine} />
                    <Text style={styles.customGroupHeaderText}>{item.label.toUpperCase()}</Text>
                    <View style={styles.customGroupHeaderLine} />
                  </View>
                )}
              />
            </View>

            {/* Candy */}
            <View style={[styles.variant, { backgroundColor: THEMES.candy.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.candy.titleColor }]}>Candy</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS}
                value={v22}
                onChange={(item) => setV22(item.value)}
                placeholder="Pick something sweet…"
                searchable
                clearable
                colors={THEMES.candy.selectColors}
                sizes={THEMES.candy.sizes}
                typography={THEMES.candy.typography}
                icons={THEMES.candy.icons}
                pressedOpacity={0.7}
                hideDivider={true}
                hideItemSeparator={false}
              />
            </View>

            {/* Sunset */}
            <View style={[styles.variant, { backgroundColor: THEMES.sunset.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.sunset.titleColor }]}>Sunset</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS}
                value={v23}
                onChange={(item) => setV23(item.value)}
                placeholder="Choose your destination…"
                searchable
                clearable
                colors={THEMES.sunset.selectColors}
                sizes={THEMES.sunset.sizes}
                typography={THEMES.sunset.typography}
                icons={THEMES.sunset.icons}
                pressedOpacity={0.6}
              />
            </View>

            {/* Terminal */}
            <View style={[styles.variant, { backgroundColor: THEMES.terminal.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.terminal.titleColor }]}>Terminal</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS}
                value={v24}
                onChange={(item) => setV24(item.value)}
                placeholder="> type_"
                searchable
                clearable
                colors={THEMES.terminal.selectColors}
                sizes={THEMES.terminal.sizes}
                typography={THEMES.terminal.typography}
                icons={THEMES.terminal.icons}
                pressedOpacity={0.3}
              />
            </View>
          </>
        )}

        {page === 4 && (
          <>
            {/* Highlight */}
            <View style={[styles.variant, { backgroundColor: THEMES.mint.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.mint.titleColor }]}>Highlight</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS}
                value={v30}
                onChange={(item) => setV30(item.value)}
                placeholder="Choose something..."
                searchable
                renderTrigger={({ onPress, onClear, hasValue, selectedLabel }) => (
                  <Pressable
                    onPress={onPress}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1.5,
                      borderColor: hasValue ? '#10B981' : '#D1FAE5',
                      borderRadius: 20,
                      paddingHorizontal: 16,
                      height: 52,
                      backgroundColor: '#FFFFFF',
                      opacity: pressed ? 0.75 : 1,
                      shadowColor: '#065F46',
                      shadowOpacity: 0.08,
                      shadowRadius: 6,
                      elevation: 2,
                    })}
                  >
                    {/* Left icon */}
                    <Icon.Ionicons
                      name="leaf"
                      size={18}
                      color={hasValue ? '#10B981' : '#9CA3AF'}
                      style={{ marginRight: 12 }}
                    />

                    {/* Label */}
                    <View style={{ flex: 1 }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 15,
                          color: hasValue ? '#022C22' : '#9CA3AF',
                        }}
                      >
                        {selectedLabel}
                      </Text>
                    </View>

                    {/* Clear button */}
                    {hasValue && (
                      <Pressable
                        onPress={(e) => {
                          // e.stopPropagation(); // Should work without - use eventually to prevent the clear button from being pressed when the trigger is pressed.
                          onClear();
                        }}
                        style={({ pressed }) => ({
                          padding: 6,
                          borderRadius: 999,
                          backgroundColor: pressed ? '#D1FAE5' : 'transparent',
                        })}
                      >
                        <Icon.Ionicons name="close" size={22} color="#10B981" />
                      </Pressable>
                    )}
                  </Pressable>
                )}
              />
            </View>

            {/* Underline */}
            <View style={[styles.variant, { backgroundColor: THEMES.underline.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.underline.titleColor }]}>Underline</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS} value={v31}
                onChange={(item) => setV31(item.value)}
                placeholder="Select option…" searchable clearable
                pressedOpacity={0.4}
                renderTrigger={({ onPress, onClear, hasValue, selectedLabel }) => (
                  <Pressable
                    onPress={onPress}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 4,
                      paddingBottom: 10,
                      opacity: pressed ? 0.5 : 1,
                      borderBottomWidth: 2,
                      borderBottomColor: hasValue ? '#F97316' : '#FED7AA',
                    })}
                  >
                    <Icon.Ionicons
                      name="pricetag-outline"
                      size={16}
                      color={hasValue ? '#F97316' : '#FDBA74'}
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        flex: 1,
                        fontSize: 16,
                        color: hasValue ? '#431407' : '#9CA3AF',
                        letterSpacing: 0.2,
                      }}
                    >
                      {selectedLabel}
                    </Text>
                    {hasValue ? (
                      <Pressable
                        onPress={(e) => { e.stopPropagation(); onClear(); }}
                        hitSlop={8}
                      >
                        <Icon.Ionicons name="close" size={16} color="#F97316" />
                      </Pressable>
                    ) : (
                      <Icon.Ionicons name="chevron-down" size={16} color="#FDBA74" />
                    )}
                  </Pressable>
                )}
              />
            </View>

            {/* Filled */}
            <View style={[styles.variant, { backgroundColor: THEMES.filled.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.filled.titleColor }]}>Filled</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS} value={v32}
                onChange={(item) => setV32(item.value)}
                placeholder="Pick something…" searchable clearable
                pressedOpacity={0.6}
                renderTrigger={({ onPress, onClear, hasValue, selectedLabel }) => (
                  <Pressable
                    onPress={onPress}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 14,
                      paddingLeft: 6,
                      paddingRight: 12,
                      height: 52,
                      backgroundColor: pressed ? '#4338CA' : '#4F46E5',
                      shadowColor: '#3730A3',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.35,
                      shadowRadius: 10,
                      elevation: 5,
                    })}
                  >
                    {/* Colored circle icon */}
                    <View style={{
                      width: 36, height: 36, borderRadius: 10,
                      backgroundColor: 'rgba(255,255,255,0.18)',
                      justifyContent: 'center', alignItems: 'center',
                      marginRight: 12,
                    }}>
                      <Icon.Ionicons
                        name={hasValue ? 'checkmark' : 'list-outline'}
                        size={18}
                        color="#FFFFFF"
                      />
                    </View>
                    <Text
                      numberOfLines={1}
                      style={{
                        flex: 1,
                        fontSize: 15,
                        fontWeight: '600',
                        color: hasValue ? '#FFFFFF' : '#A5B4FC',
                        letterSpacing: 0.1,
                      }}
                    >
                      {selectedLabel}
                    </Text>
                    {hasValue ? (
                      <Pressable
                        onPress={(e) => { e.stopPropagation(); onClear(); }}
                        style={{
                          width: 26, height: 26, borderRadius: 8,
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          justifyContent: 'center', alignItems: 'center',
                          marginLeft: 8,
                        }}
                      >
                        <Icon.Ionicons name="close" size={14} color="#C7D2FE" />
                      </Pressable>
                    ) : (
                      <Icon.Ionicons name="chevron-expand" size={18} color="#A5B4FC" style={{ marginLeft: 6 }} />
                    )}
                  </Pressable>
                )}
              />
            </View>

            {/* Outlined */}
            <View style={[styles.variant, { backgroundColor: THEMES.outlined.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.outlined.titleColor }]}>Outlined</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS} value={v33}
                onChange={(item) => setV33(item.value)}
                placeholder="Choose…" searchable clearable
                pressedOpacity={0.4}
                renderTrigger={({ onPress, onClear, hasValue, selectedLabel }) => (
                  <Pressable
                    onPress={onPress}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 999,
                      paddingHorizontal: 18,
                      height: 48,
                      backgroundColor: pressed ? '#FDF4FF' : '#FFFFFF',
                      borderWidth: 2,
                      borderColor: hasValue ? '#D946EF' : '#E879F9',
                      shadowColor: '#D946EF',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: pressed ? 0.5 : 0.2,
                      shadowRadius: 8,
                      elevation: 3,
                    })}
                  >
                    {hasValue ? (
                      <View style={{
                        backgroundColor: '#FAE8FF',
                        borderRadius: 999,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        marginRight: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#D946EF' }} />
                        <Text style={{ fontSize: 11, color: '#86198F', fontWeight: '700' }}>1</Text>
                      </View>
                    ) : (
                      <Icon.Ionicons
                        name="options-outline"
                        size={16}
                        color="#E879F9"
                        style={{ marginRight: 10 }}
                      />
                    )}
                    <Text
                      numberOfLines={1}
                      style={{
                        flex: 1,
                        fontSize: 15,
                        color: hasValue ? '#4A044E' : '#A855F7',
                        fontWeight: hasValue ? '600' : '400',
                      }}
                    >
                      {selectedLabel}
                    </Text>
                    {hasValue ? (
                      <Pressable
                        onPress={(e) => { e.stopPropagation(); onClear(); }}
                        style={{
                          marginLeft: 8,
                          padding: 4,
                          borderRadius: 999,
                          backgroundColor: '#FAE8FF',
                        }}
                      >
                        <Icon.Ionicons name="close" size={14} color="#D946EF" />
                      </Pressable>
                    ) : (
                      <Icon.Ionicons name="chevron-down" size={16} color="#E879F9" style={{ marginLeft: 6 }} />
                    )}
                  </Pressable>
                )}
              />
            </View>

            {/* Glass */}
            <View style={[styles.variant, { backgroundColor: THEMES.glass.bg }]}>
              <Text style={[styles.variantTitle, { color: THEMES.glass.titleColor }]}>Glass</Text>
              <View style={{ height: 12 }} />
              <ReactNativeSelect
                options={LOREM_IPSUM_OPTIONS} value={v34}
                onChange={(item) => setV34(item.value)}
                placeholder="Explore…" searchable clearable
                pressedOpacity={0.5}
                renderTrigger={({ onPress, onClear, hasValue, selectedLabel }) => (
                  <Pressable
                    onPress={onPress}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 22,
                      height: 54,
                      overflow: 'hidden',
                      backgroundColor: pressed
                        ? 'rgb(181, 239, 232)'
                        : 'rgb(217, 251, 246)',
                      borderWidth: 1,
                      borderColor: 'rgba(20,184,166,0.4)',
                      shadowColor: '#0F766E',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.15,
                      shadowRadius: 12,
                      elevation: 4,
                    })}
                  >
                    {/* Accent bar on the left */}
                    <View style={{
                      width: 4,
                      alignSelf: 'stretch',
                      backgroundColor: hasValue ? '#14B8A6' : 'rgba(20,184,166,0.3)',
                      borderTopLeftRadius: 22,
                      borderBottomLeftRadius: 22,
                    }} />
                    <Icon.Ionicons
                      name="diamond-outline"
                      size={17}
                      color={hasValue ? '#0F766E' : '#5EEAD4'}
                      style={{ marginHorizontal: 12 }}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        flex: 1,
                        fontSize: 15,
                        color: hasValue ? '#042F2E' : '#5EEAD4',
                        fontStyle: hasValue ? 'normal' : 'italic',
                      }}
                    >
                      {selectedLabel}
                    </Text>
                    {hasValue ? (
                      <Pressable
                        onPress={(e) => { e.stopPropagation(); onClear(); }}
                        style={{
                          marginRight: 14,
                          width: 24, height: 24, borderRadius: 8,
                          backgroundColor: 'rgba(20,184,166,0.15)',
                          justifyContent: 'center', alignItems: 'center',
                        }}
                      >
                        <Icon.Ionicons name="close" size={14} color="#0D9488" />
                      </Pressable>
                    ) : (
                      <Icon.Ionicons
                        name="chevron-down"
                        size={16}
                        color="#5EEAD4"
                        style={{ marginRight: 16 }}
                      />
                    )}
                  </Pressable>
                )}
              />
            </View>
          </>
        )}

      </View>
    </ScrollView >
  );
}

const COLORS = {
  background: '#FFF',
  primary: '#64748B',
  primaryLight: '#EEF2FF',
  border: '#C7D2FE',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  scrollContent: {
    paddingHorizontal: 20
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  badgeTextActive: {
    color: COLORS.primaryLight,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  lead: {
    fontSize: 15,
    lineHeight: 22,
    color: '#64748B',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    overflow: 'hidden',
    padding: 20,
  },
  cardTransparent: {
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  variant: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  variantTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  customGroupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 8,
  },
  customGroupHeaderLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CCCCCC',
  },
  customGroupHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1.2,
  },
});

const THEMES = {

  //* Page 2

  rose: {
    bg: '#FFE4E6',
    titleColor: '#881337',
    selectColors: {
      primary: '#FFF1F2',
      secondary: '#BE123C',
      colorTextPrimary: '#881337',
      colorTextSecondary: '#E11D48',
      lines: '#FECDD3',
      disabled: '#FFE4E6',
      shadow: '#9F1239',
      selected: '#FECDD3',
    },
    sizes: { borderRadius: 35, itemHeight: 60, maxListWidth: 400 },
  },

  ambient: {
    bg: '#FFEDD5',
    titleColor: '#431407',
    selectColors: {
      primary: '#FFF4E6',
      secondary: '#C2410C',
      colorTextPrimary: '#431407',
      colorTextSecondary: '#EA580C',
      lines: '#FED7AA',
      disabled: '#FFEDD5',
      shadow: '#9A3412',
      selected: '#FED7AA',
    },
    sizes: { borderRadius: 20, itemHeight: 50, maxListWidth: 380, borderWidth: 1 },
  },

  emerald: {
    bg: '#D1FAE5',
    titleColor: '#064E3B',
    selectColors: {
      primary: '#ECFDF5',
      secondary: '#047857',
      colorTextPrimary: '#064E3B',
      colorTextSecondary: '#10B981',
      lines: '#A7F3D0',
      disabled: '#D1FAE5',
      shadow: '#065F46',
      selected: '#D1FAE5',
      border: '#A7F3D0',
    },
    sizes: { borderRadius: 15, itemHeight: 40, maxListWidth: 380, borderWidth: 2 },
  },

  ocean: {
    bg: '#DBEAFE',
    titleColor: '#0C2C66',
    selectColors: {
      primary: '#EFF6FF',
      secondary: '#1D4ED8',
      colorTextPrimary: '#0C2C66',
      colorTextSecondary: '#3B82F6',
      lines: '#BFDBFE',
      disabled: '#DBEAFE',
      shadow: '#1E3A8A',
      selected: '#BFDBFE',
      border: '#BFDBFE',
    },
    sizes: { borderRadius: 10, itemHeight: 35, maxListWidth: 320, borderWidth: 1 },
  },

  midnight: {
    bg: '#1E293B',
    titleColor: '#F8FAFC',
    selectColors: {
      primary: '#0F172A',
      secondary: '#94A3B8',
      colorTextPrimary: '#F8FAFC',
      colorTextSecondary: '#64748B',
      lines: '#1E293B',
      disabled: '#1E293B',
      shadow: '#FFFFFF',
      selected: '#1E293B',
    },
    sizes: { borderRadius: 8, itemHeight: 30 },
  },

  //* Page 3

  mint: {
    bg: '#ECFDF5',
    titleColor: '#065F46',

    selectColors: {
      primary: '#FFFFFF',
      secondary: '#10B981',
      colorTextPrimary: '#022C22',
      colorTextSecondary: '#6EE7B7',
      lines: '#A7F3D0',
      disabled: '#F0FDF4',
      shadow: '#065F46',
      selected: '#D1FAE5',
      border: '#34D399',
    },

    sizes: {
      borderRadius: 28,
      itemHeight: 60,
      borderWidth: 1.5,
      iconSize: 26,
      itemPaddingHorizontal: 24,
      inputPaddingLeft: 24,
      inputPaddingRight: 12,
    },

    icons: {
      chevron: 'leaf',
      close: 'close-circle',
    },

    typography: {
      fontSize: 16,
      fontFamily: 'Avenir',
    },
  },

  seaside: {
    bg: 'rgb(196, 232, 255)',
    titleColor: '#1E3A8A',
    selectColors: {
      primary: '#FFFFFF',
      secondary: '#0EA5E9',
      colorTextPrimary: '#0F172A',
      colorTextSecondary: '#3B82F6',
      lines: '#BAE6FD',
      disabled: '#F0F9FF',
      shadow: '#0369A1',
      selected: '#E0F2FE',
      border: '#7DD3FC',
    },
    sizes: {
      borderRadius: 28,
      itemHeight: 60,
      borderWidth: 1.5,
      iconSize: 26,
      itemPaddingHorizontal: 24,
      inputPaddingLeft: 24,
      inputPaddingRight: 12,
    },
    icons: {
      chevron: 'water',
      close: 'close-circle',
    },
    typography: {
      fontSize: 16,
      fontFamily: 'Avenir',
    },
  },

  menu: {
    bg: '#F5F0E8',
    titleColor: '#1A1A1A',
    selectColors: {
      primary: '#FAFAF7',
      secondary: '#4A4A4A',
      colorTextPrimary: '#1A1A1A',
      colorTextSecondary: '#6A6A6A',
      lines: '#C8BFA8',
      disabled: '#EEEBE3',
      shadow: '#000000',
      selected: '#EDE8DC',
      border: '#1A1A1A',
    },
    sizes: { borderRadius: 0, itemHeight: 38, borderWidth: 2, itemPaddingHorizontal: 20, inputPaddingLeft: 20 },
    icons: { chevron: 'chevron-down', close: 'close' },
    typography: { fontSize: 15, fontFamily: 'Georgia' },
  },

  candy: {
    bg: '#FDF2F8',
    titleColor: '#BE185D',
    selectColors: {
      primary: '#FDF4FF',
      secondary: '#A855F7',
      colorTextPrimary: '#BE185D',
      colorTextSecondary: '#EC4899',
      lines: '#F0ABFC',
      disabled: '#FAE8FF',
      shadow: '#C026D3',
      selected: '#F5D0FE',
      border: '#F0ABFC',
    },
    sizes: { borderRadius: 50, itemHeight: 65, borderWidth: 2, iconSize: 28, itemPaddingHorizontal: 24, inputPaddingLeft: 24, inputPaddingRight: 8 },
    icons: { chevron: 'chevron-down-circle', close: 'close-circle' },
    typography: { fontSize: 18 },
  },

  sunset: {
    bg: '#1A0533',
    titleColor: '#FF6B9D',
    selectColors: {
      primary: '#2D0A4E',
      secondary: '#FF6B9D',
      colorTextPrimary: '#FFD6EC',
      colorTextSecondary: '#C084FC',
      lines: '#7C3AED',
      disabled: '#1A0533',
      shadow: '#FF6B9D',
      selected: '#4C1D95',
      border: '#7C3AED',
    },
    sizes: { borderRadius: 25, itemHeight: 40, borderWidth: 1, iconSize: 22 },
    icons: { chevron: 'chevron-down-circle-outline', close: 'remove-circle-outline' },
    typography: { fontSize: 16 },
  },

  terminal: {
    bg: '#000000',
    titleColor: '#00FF00',
    selectColors: {
      primary: '#0A0A0A',
      secondary: '#00BB00',
      colorTextPrimary: '#00FF00',
      colorTextSecondary: '#006600',
      lines: '#003300',
      disabled: '#111111',
      shadow: '#00FF00',
      selected: '#001A00',
      border: '#00FF00',
    },
    sizes: { borderRadius: 2, itemHeight: 30, borderWidth: 1, itemPaddingHorizontal: 12, inputPaddingLeft: 12 },
    icons: { chevron: 'arrow-down', close: 'backspace' },
    typography: { fontSize: 13, fontFamily: 'Courier' },
  },

  //* Page 4

  underline: {
    bg: '#FFF7ED',
    titleColor: '#9A3412',
    selectColors: {
      primary: '#FFFFFF',
      secondary: '#F97316',
      colorTextPrimary: '#431407',
      colorTextSecondary: '#9CA3AF',
      lines: '#FED7AA',
      disabled: '#FEF3C7',
      shadow: '#9A3412',
      selected: '#FEF3C7',
      border: '#F97316',
    },
    sizes: {
      borderRadius: 0,
      itemHeight: 50,
      borderWidth: 0,
      itemPaddingHorizontal: 12,
      inputPaddingLeft: 4,
    },
    icons: { chevron: 'chevron-down', close: 'close' },
    typography: { fontSize: 16 },
  },

  filled: {
    bg: '#cedfff',
    titleColor: '#3730A3',
    selectColors: {
      primary: '#4F46E5',
      secondary: '#C7D2FE',
      colorTextPrimary: '#FFFFFF',
      colorTextSecondary: '#A5B4FC',
      lines: '#6366F1',
      disabled: '#818CF8',
      shadow: '#3730A3',
      selected: '#6366F1',
      border: '#4338CA',
    },
    sizes: {
      borderRadius: 14,
      itemHeight: 52,
      borderWidth: 0,
      itemPaddingHorizontal: 20,
      inputPaddingLeft: 20,
    },
    icons: { chevron: 'chevron-expand', close: 'close-circle' },
    typography: { fontSize: 15 },
  },

  outlined: {
    bg: '#FDF4FF',
    titleColor: '#86198F',
    selectColors: {
      primary: '#FFFFFF',
      secondary: '#D946EF',
      colorTextPrimary: '#4A044E',
      colorTextSecondary: '#A855F7',
      lines: '#E879F9',
      disabled: '#F5D0FE',
      shadow: '#000000',
      selected: '#FAE8FF',
      border: '#D946EF',
    },
    sizes: {
      borderRadius: 999,
      itemHeight: 48,
      borderWidth: 2,
      itemPaddingHorizontal: 20,
      inputPaddingLeft: 20,
    },
    icons: { chevron: 'options-outline', close: 'close' },
    typography: { fontSize: 15 },
  },

  glass: {
    bg: '#F0FDFA',
    titleColor: '#0F766E',
    selectColors: {
      primary: 'rgba(20, 184, 165, 0.90)',
      secondary: '#14B8A6',
      colorTextPrimary: '#042F2E',
      colorTextSecondary: '#5EEAD4',
      lines: 'rgba(20,184,166,0.28)',
      disabled: 'rgba(20,184,166,0.06)',
      shadow: '#0F766E',
      selected: 'rgba(20,184,166,0.22)',
      border: 'rgba(20,184,166,0.45)',
    },
    sizes: {
      borderRadius: 22,
      itemHeight: 54,
      borderWidth: 1,
      itemPaddingHorizontal: 22,
      inputPaddingLeft: 22,
    },
    icons: { chevron: 'diamond-outline', close: 'close' },
    typography: { fontSize: 15 },
  },
};
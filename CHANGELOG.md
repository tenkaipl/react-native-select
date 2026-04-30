# Changelog

All notable changes to this project will be documented in this file.

## [0.1.1] - 2026-04-30

### Added
- `triggerMinWidth` prop for better control over trigger sizing

### Fixed
- Removed default focus outline on web (`outlineStyle: 'none'`) for consistent appearance

## [0.1.0] - 2026-04-29

### Added

- Single select with controlled `value` / `onChange` API
- Search (`searchable`) and clear (`clearable`) support
- Option groups with automatic filtering during search
- `flattenGroupedOptions` helper for nested API data
- `renderTrigger` and `renderGroupHeader` render props
- `disabled` state
- Light and dark theme presets (`theme` prop)
- Full customization via `colors`, `sizes`, `typography`, and `icons` props
- Additive style overrides: `triggerStyle`, `dropdownStyle`, `itemStyle`, `groupHeaderStyle`
- iOS, Android, Web, and Expo support
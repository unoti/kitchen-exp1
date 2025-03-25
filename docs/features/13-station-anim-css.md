# Brainstorming Chef Animation with Claude

More detailed and improved thoughts: [Chef Animation Ideas](https://claude.ai/share/fe5908af-987d-4247-9209-f1d8c72c7b24)


# Positioning Specification for Kitchen UI Container and Stations

## Container Setup
```css
.kitchen-container {
    position: relative;  /* CRITICAL: This makes absolute children position relative to this container */
    width: 800px;        /* Fixed width for prototype */
    height: 400px;       /* Fixed height for prototype */
    border: 1px solid #ccc;  /* Optional: visual boundary */
    margin: 0 auto;      /* Center the container */
}
```

## Station Styling
```css
.station {
    position: absolute;  /* Allows precise positioning within the relative container */
    width: 250px;        /* Example width */
    height: 140px;       /* Example height */
    border: 2px solid #333;
    
    /* Centering content within station */
    display: flex;
    align-items: center;
    justify-content: center;
}
```

## Positioning Explanation
- `position: relative` on the container
  - Creates a positioning context for absolutely positioned children
  - All absolute positions inside will be calculated from this container's top-left corner
  - Prevents absolute positioning from being relative to the entire viewport

- `position: absolute` on stations
  - Allows you to place stations at exact pixel coordinates
  - Coordinates are relative to the nearest positioned ancestor (in this case, the kitchen container)

### Key Takeaway
- Parent container: `position: relative`
- Child elements (stations, chef): `position: absolute`

This ensures predictable, pixel-perfect positioning without viewport-related surprises.
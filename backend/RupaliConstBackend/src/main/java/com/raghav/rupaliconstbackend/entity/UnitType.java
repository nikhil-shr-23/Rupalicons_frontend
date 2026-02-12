package com.raghav.rupaliconstbackend.entity;

public enum UnitType {

    STUDIO_APARTMENT("Studio Apartment"),
    TWO_BHK("2 BHK"),
    TWO_POINT_FIVE_BHK("2.5 BHK"),
    THREE_BHK("3 BHK"),
    THREE_POINT_FIVE_BHK("3.5 BHK"),
    FOUR_BHK("4 BHK"),
    FOUR_POINT_FIVE_BHK("4.5 BHK"),
    FIVE_BHK("5 BHK"),
    PENTHOUSE("Penthouse"),
    DUPLEX_PENTHOUSE("Duplex Penthouse"),
    TRIPLEX_PENTHOUSE("Triplex Penthouse"),
    VILLA("Villa"),
    DDJAY_PLOT("DDJAY Plot"),
    PLOT("Plot");

    private final String displayName;

    UnitType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}

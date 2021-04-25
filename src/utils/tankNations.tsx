
/**
 * Note: TODO: Probably better this nations list is automated based on data from WG, that way we don't need to manually update if/when new nations are updated
 */

const NATIONS: { [key: string]: string } = {
    usa: 'U.S.A.', germany: 'Germany', uk: 'U.K.', ussr: 'U.S.S.R.', france: 'France', japan: 'Japan', china: 'China', czech: 'Czechoslovakia', sweden: 'Sweden', poland: 'Poland', italy: 'Italy', merc: 'Mercenaries'
}

function toNation(slug: string): string {
    return NATIONS[slug] ?? 'unknown nation'
}

export {
    toNation,
    NATIONS
}



export default function gtagHelper() {
	window.gtag && window.gtag(...arguments)
}

// gtagHelper('event', 'timing_complete', {
    // name: 'load',
    // value: Date.now() - startTime,
    // event_category: 'Player Profile Page',
    // event_label: 'WG: Tanks'
// })


// gtagHelper('event', 'statsby_series_selection_y', {
//     'event_category': 'statsby_chart',
//     'event_label': dropdownOptions[e.target.value].label,
// })

document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-container-1', {
        spaceBetween: 50,
        slidesPerView: 3,
        breakpoints: {
            // Mobile (small screens)
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // Tablets
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            // Desktops and large screens
            1400: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
        on: {
            slideChange: () => console.log('slide change'),
            // init: (swiper) => console.log(swiper),
        },
    });

    console.log('Swiper initialized:', swiper);

    const swiper2 = new Swiper('.swiper-container-2', {
        spaceBetween: 50,
        slidesPerView: 3,
        breakpoints: {
            // Mobile (small screens)
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // Tablets
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            // Desktops and large screens
            1400: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
        on: {
            slideChange: () => console.log('slide change'),
            // init: (swiper) => console.log(swiper),
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next-2',
            prevEl: '.swiper-button-prev-2',
        },
    });

    const swiper3 = new Swiper('.swiper-container-3', {
        spaceBetween: 50,
        slidesPerView: 1,
        on: {
            slideChange: () => console.log('slide change'),
            // init: (swiper3) => console.log(swiper3),
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next-3',
            prevEl: '.swiper-button-prev-3',
        },
    });

});



let activeTab = 0;
let activeTab2 = 3;
let activeTab3 = 6;

// Function to handle tab changes for each group
function handleTabChange(index, group) {
    let activeTabVariable, tabPrefix, tabPanePrefix;

    // Set the active tab variable for the appropriate group
    if (group === 1) {
        activeTab = index;
        activeTabVariable = activeTab;
        tabPrefix = "tab1";
        tabPanePrefix = "tab-pane1";
    } else if (group === 2) {
        activeTab2 = index;
        activeTabVariable = activeTab2;
        tabPrefix = "tab2";
        tabPanePrefix = "tab-pane2";
    } else {
        activeTab3 = index;
        activeTabVariable = activeTab3;
        tabPrefix = "tab3";
        tabPanePrefix = "tab-pane3";
    }

    // Add class 'active' to the clicked tab and remove 'active' from others
    document.querySelectorAll(`button.nav-link.${tabPrefix}`).forEach((tab, idx) => {
        tab.classList.remove("active");
        console.log(idx, activeTabVariable);
        if (idx === activeTabVariable) {
            // console.log(idx, activeTabVariable);
            tab.classList.add("active");
        }
    });

    // Show the active tab content and hide others
    document.querySelectorAll(`.${tabPanePrefix}`).forEach((tabPane, idx) => {
        tabPane.classList.remove("show", "active");
        if (idx === activeTabVariable) {
            tabPane.classList.add("show", "active");
        }
    });
}

// Initialize tab changes for all groups
handleTabChange(0, 1);
handleTabChange(0, 2);
handleTabChange(0, 3);

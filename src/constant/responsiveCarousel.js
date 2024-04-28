export const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1350 },
        items: 4,
        slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1350, min: 988 },
        items: 3,
        slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 988, min: 698 },
        items: 2,
        slidesToSlide: 1, // optional, default to 1.
    },
    xl: {
        breakpoint: { max: 698, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};
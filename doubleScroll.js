class doubleScroll {
    constructor(mainElementId, scrollerElementId) {
        this.mainElement = document.querySelector(mainElementId);

        this.scrollWrapper = document.querySelector(scrollerElementId);

        // this.scrollWrapper = document.createElement("div");
        this.scrollWrapper.style['overflow-x'] = "scroll";
        this.scrollWrapper.style.height = "20px";
        this.scrollWrapper.style['margin-bottom'] = "20px";

        this.scrollerElement = document.createElement("div");
        this.scrollerElement.setAttribute('data-name', 'scroller-element')
        this.scrollWrapper.insertBefore(this.scrollerElement, this.scrollWrapper.firstChild);

        // this.mainElement.insertBefore(this.scrollWrapper, this.mainElement.firstChild);

        this.resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const width = entry.target.scrollWidth;
                this.scrollerElement.style.width = `${width}px`;
            }
        });

        this.scrollWrapperScrollHandler = () => {
            // console.warn('scrollWrapperScrollHandler')
            this.mainElement.scrollLeft = this.scrollWrapper.scrollLeft;
        };
        this.mainElementScrollHandler = () => {
            // console.warn('mainElementScrollHandler')
            this.scrollWrapper.scrollLeft = this.mainElement.scrollLeft;
        };
    }

    start() {
        this.resizeObserver.observe(this.mainElement);
        this.scrollWrapper.addEventListener("scroll", this.scrollWrapperScrollHandler);
        this.mainElement.addEventListener("scroll", this.mainElementScrollHandler);
    }

    stop() {
        this.resizeObserver.disconnect();
        this.scrollWrapper.removeEventListener("scroll", this.scrollWrapperScrollHandler);
        this.mainElement.removeEventListener("scroll", this.mainElementScrollHandler);
    }
}

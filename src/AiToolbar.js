import React from "react";
import PropTypes from 'prop-types';



/**
 * Minimal Toolbar / Appbar React Component.
 *
 * @author [Apptitude Infotech](https://github.com/ApptitudeInfotech)
 */
const AiToolbar = (props) => {
    const {
        color = '#ffffff',
        height = 56,
        hideOnScroll = true,
        children,
        ...rest
    } = props;

    const [isOpened, setIsOpened] = React.useState(true);
    const [lastScrollTop, setLastScrollTop] = React.useState(0);
    const [scrollTop, setScrollTop] = React.useState(0);

    React.useEffect(() => {
        if (hideOnScroll) {
            window.addEventListener("scroll", handleScroll);
        } else {
            window.removeEventListener("scroll", handleScroll);
            setScrollTop(0);
        }

        function handleScroll() {
            return requestAnimationFrame(() => {
                setScrollTop(document.documentElement.scrollTop);
            })
        }

        return function cleanup() {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [hideOnScroll]);

    React.useEffect(() => {
        if (scrollTop > (Number(height) + 6)) {
            if (scrollTop > lastScrollTop) {
                if (isOpened) {
                    setIsOpened(false);
                }
            } else {
                if (!isOpened) {
                    setIsOpened(true);
                }
            }
        } else {
            if (!isOpened) {
                setIsOpened(true);
            }
        }
        setLastScrollTop(scrollTop);
    }, [scrollTop]);

    return (
        <div title="toolbar"
            style={{
                display: `block`,
                position: `fixed`,
                top: 0,
                left: 0,
                right: 0,
                width: `100%`,
                boxShadow: `0px -1px 4px 2px rgba(0, 0, 0, 0.2), 0px 2px 5px 0px rgba(0, 0, 0, 0.14), 0px 0px 5px 0px rgba(0, 0, 0, 0.12)`,
                willChange: `transform`,
                transition: `transform 200ms linear`,
                zIndex: 1002,
                textAlign: `left`,
                height: `${Number(height)}px`,
                transform: (isOpened ? `translateY(0%)` : `translateY(-110%)`),
            }}
            {...rest}
        >
            <div title="toolbar-container"
                style={{
                    WebkitUserSelect: `none`,
                    userSelect: `none`,
                    width: `100%`,
                    height: `${Number(height)}px`,
                    display: `flex`,
                    flexFlow: `row nowrap`,
                    alignItems: `center`,
                    backgroundColor: `${color}`
                }}
            >
                {children}
            </div>
        </div>
    );
};

AiToolbar.propTypes = {
    /**
    * Toolbar Color   
    */
    color: PropTypes.string,
    /**
   * Toolbar Height   
   */
    height: PropTypes.number,
    /**
   * Hide Toolbar On Scroll 
   */
    hideOnScroll: PropTypes.bool,
    /**
     * Toolbar children, Title, Icon or Button
     * @ignore
     */
    children: PropTypes.node
};

AiToolbar.defaultProps = {
    color: '#ffffff',
    hideOnScroll: true,
    height: 56,
};

export default AiToolbar;
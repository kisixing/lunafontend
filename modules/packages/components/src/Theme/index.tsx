import React, { useState, useEffect, useImperativeHandle } from 'react';
import { GithubPicker } from 'react-color';
import tinycolor from 'tinycolor2';
import { getThemeColor, applyAntdTheme, placementSketchPicker } from './util';

// const colors = [
//     '#b71c1c', '#e65100', '#ff6f00', '#bf360c', '#880e4f', '#33691e', '#006064', '#004d40',
//     '#00838f', '#546e7a', '#5e35b1', '#1a237e', '#311b92', '#4a148c', '#827717', '#0d47a1'
// ]
const colors = [
  '#33691e',
  '#006064',
  '#ffa7c4',
  '#bc5100',
  '#1a237e',
  '#4a148c',
  '#827717',
  '#0d47a1',
  '#1890ff',
  '#1DA57A',
  '#0078d7',
];

interface IProps {
    primaryColor?: string,
    storageName?: string,
    style?: React.CSSProperties,
    placement?: any,
    onChange?: (color: string) => void,
    mask?: boolean
}

const A = (props: IProps, ref) => {



    useImperativeHandle(ref, () => ({
        toggle: handleClick,
        handleChange
    }));

    const {
        primaryColor = '#1890ff',
        storageName = 'custom-antd-primary-color',
        style = {},
        placement = null,
        onChange = null,
        mask = true
    } = props

    const [color, setColor] = useState(tinycolor(primaryColor).toRgb())
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    useEffect(() => {
        const storageColor = primaryColor || window.localStorage.getItem(storageName)
        if (storageColor) {
            const theme = getThemeColor(storageColor)
            applyAntdTheme(theme);
            document.getElementById('change_antd_theme_color').style.backgroundColor = storageColor;
            if (onChange) {
                onChange(storageColor);
            }
        }
    }, [])


    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);

    };

    const handleChange = color => {
        setColor(color.rgb);
        applyAntdTheme(getThemeColor(color.hex));
        window.localStorage.setItem(storageName, color.hex);
        onChange && onChange(color.hex);
    };

    const styles: { [x: string]: React.CSSProperties } = {
        color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
        },
        swatch: {
            width: '46px',
            maxWidth: '46px',
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            // boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer'
        },
        popover: {
            position: 'absolute',
            zIndex: 99999,
            ...placementSketchPicker(placement)
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
            cursor: 'auto'
        }
    };
    const P = () => {
        return (
            <GithubPicker
                styles={{ default: { card: { boxSizing: 'content-box' } } }}
                triangle='hide'
                color={color}
                onChange={handleChange}
                colors={colors}
            />
        )
    }
    return (
        <div id='change_antd_theme_button' style={{ ...styles.swatch, ...style }} onClick={handleClick}>
            <div id='change_antd_theme_color' style={styles.color} />
            {
                displayColorPicker
                    ? <div style={styles.popover}>
                        {mask && <div style={styles.cover} onClick={handleClose} />}
                        <P />
                    </div> : null
            }
        </div>
    );
}
type T = React.ForwardRefExoticComponent<IProps & React.RefAttributes<unknown>> & { colors?: any, P?: any }
const AntdThemeManipulator = React.forwardRef(A);
const C: T = Object.assign(AntdThemeManipulator, { P: GithubPicker, colors })

export { C as AntdThemeManipulator, getThemeColor, applyAntdTheme as changeAntdTheme }

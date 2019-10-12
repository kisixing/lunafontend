import React, { useState, useEffect } from 'react';
import { GithubPicker } from 'react-color';
import tinycolor from 'tinycolor2';
import { getThemeColor, applyAntdTheme, placementSketchPicker } from './util';

const colors = ['#01579b', '#e65100', '#ff6f00', '#546e7a', '#827717', '#33691e', '#00838f', '#004d40',
    '#006064', '#bf360c', '#5e35b1', '#1a237e', '#311b92', '#4a148c', '#880e4f', '#b71c1c']

interface IProps {
    primaryColor?: string,
    storageName?: string,
    style?: React.CSSProperties,
    placement?: any,
    onChange?: (color: string) => void
}

const AntdThemeManipulator = (props: IProps) => {

    const {
        primaryColor = '#1890ff',
        storageName = 'custom-antd-primary-color',
        style = { display: 'inline-block' },
        placement = null,
        onChange = null
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
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
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
            left: '0px'
        }
    };

    return (
        <div style={style}>
            <div id='change_antd_theme_button' style={styles.swatch} onClick={handleClick}>
                <div id='change_antd_theme_color' style={styles.color} />
            </div>
            {
                displayColorPicker
                    ? <div style={styles.popover}>
                        <div style={styles.cover} onClick={handleClose} />
                        <GithubPicker
                            styles={{ default: { card: { boxSizing: 'content-box' } } }}
                            triangle='hide'
                            color={color}
                            onChange={handleChange}
                            colors={colors}
                        />
                    </div> : null
            }
        </div>
    );
}
AntdThemeManipulator.colors = colors
export { AntdThemeManipulator, getThemeColor, applyAntdTheme as changeAntdTheme }
import { BasicArrow } from '/@/components/Basic';
export default () => {
    return (props) => {
        if (!props.expandable) {
            return <span />;
        }
        return (<BasicArrow class="mr-1" iconStyle="margin-top: -2px;" onClick={(e) => {
                props.onExpand(props.record, e);
            }} expand={props.expanded}/>);
    };
};
//# sourceMappingURL=ExpandIcon.jsx.map
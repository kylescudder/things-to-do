import Icon from "../shared/Icon";

export const CheckMark = (props: { completed: boolean }) => {
  if (props.completed) {
    return (
      <Icon
        name={"IconCircleCheckFilled"}
        stroke="1"
        strokeLinejoin="miter"
        isActive={false}
      />
    );
  } else {
    return (
      <Icon
        name={"IconCircleCheck"}
        stroke="1"
        strokeLinejoin="miter"
        isActive={false}
      />
    );
  }
};

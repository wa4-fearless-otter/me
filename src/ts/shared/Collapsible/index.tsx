import React from "react";
import styled from "./../../theme";

const Collapsible = styled.div`
    overflow: hidden;
    height: 0px;
    transition: height ${props => props.theme.transition.speed};
  `;

interface Props extends React.HTMLProps<HTMLDivElement> {
  isOpen?: boolean;
}

export default class extends React.Component<Props> {
  private collapsibleRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    // Set height to 0px on mount without an animation
    if (this.collapsibleRef.current && this.props.isOpen) {
      this.collapsibleRef.current.style.height = "auto";
    }
  }

  public render() {
    const { isOpen, ...newProps } = this.props;

    if (this.collapsibleRef.current) {
      const ref = this.collapsibleRef.current;

      if (isOpen) {
        ref.style.height = ref.scrollHeight + "px";
      } else {
        const elementTransition = ref.style.transition;

        ref.style.transition = "";

        requestAnimationFrame(() => {
            ref.style.height = ref.scrollHeight + "px";
            ref.style.transition = elementTransition;

            requestAnimationFrame(() => {
                ref.style.height = "0px";
              });
          });
      }
    }

    return (
      <div {...newProps}>
        <Collapsible ref={this.collapsibleRef} onTransitionEnd={this.transitionEnd}>
          {newProps.children}
        </Collapsible>
      </div>
    );
  }

  private transitionEnd = (ev: React.TransitionEvent<HTMLDivElement>) => {
    if (ev.currentTarget.style.height !== "0px")
      ev.currentTarget.style.height = "auto";
  }
}

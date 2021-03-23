import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

export const ChipArray = (props) => {
  const userMapping = props.userMapping;
  const handleClick = (e) => {
    console.log("You clicked the Chip with name");
    console.log(e.target.outerText);
    console.log(userMapping[e.target.outerText]);
  };

  const nameArray = props.names.split(";").map((v) => {
    const txt = v.trim();
    if (txt.length < 1) {
      //console.log(txt.length);
      return "";
    } else {
      return <Chip onClick={handleClick} variant="outlined" label={v} />;
    }
  });

  return <div>{nameArray}</div>;
};

export default ChipArray;

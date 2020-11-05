import ClassDefAnnotationParser from "./features/ClassDefAnnotationParser";
import ParserInterface from "./ParserInterface";

export default class ControllerParser implements ParserInterface {
  parse(ast: any) {
    return {
      classDefAnnotation: ClassDefAnnotationParser.parse(ast, "controller"),
    };
  }
}

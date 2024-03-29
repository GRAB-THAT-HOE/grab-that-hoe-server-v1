import { Response } from "express";
import PostRequestType from "../../../../type/PostRequestType";
import { getRepository } from "typeorm";
import Post from "../../../../entity/Post";

export default async (req, res: Response) => {
  const { phone } = req.user;
  const { idx } = req.params;
  const data: PostRequestType = req.body;
  try {
    const postRepository = getRepository(Post);
    const post: Post = await postRepository.findOne({
      where: {
        id: idx,
      },
    });
    if (!post) {
      return res.status(404).json({
        status: 404,
        message: "해당 포스팅을 찾을 수 없습니다.",
      });
    }
    if (post.user !== phone) {
      return res.status(403).json({
        status: 403,
        message: "포스팅을 수정할 권한이 없습니다.",
      });
    }

    post.title = data.title || post.title;
    post.mainlocation = data.mainlocation || post.mainlocation;
    post.sublocation = data.sublocation || post.sublocation;
    post.explanation = data.explanation || post.explanation;
    post.salary = data.salary || post.salary;
    post.additionalExplanation =
      data.additionalExplanation || post.additionalExplanation;
    post.isDisabled = data.isDisabled || post.isDisabled;
    post.isForeign = data.isForeign || post.isForeign;
    post.giveRoomAndBoard = data.giveRoomAndBoard || post.giveRoomAndBoard;
    post.giveSnack = data.giveSnack || post.giveSnack;
    post.startDateYear = data.startDateYear || post.startDateYear;
    post.startDateMonth = data.startDateMonth || post.startDateMonth;
    post.startDateDay = data.startDateDay || post.startDateDay;
    post.endDateYear = data.endDateYear || post.endDateYear;
    post.endDateMonth = data.endDateMonth || post.endDateMonth;
    post.endDateDay = data.endDateDay || post.endDateDay;
    post.startTime = data.startTime || post.startTime;
    post.endTime = data.endTime || post.endTime;
    post.breakTime = data.breakTime || post.breakTime;

    await post.save();

    return res.status(200).json({
      status: 200,
      message: "포스팅 수정에 성공했습니다.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "서버 오류로 인해 포스팅 수정에 실패했습니다.",
    });
  }
};

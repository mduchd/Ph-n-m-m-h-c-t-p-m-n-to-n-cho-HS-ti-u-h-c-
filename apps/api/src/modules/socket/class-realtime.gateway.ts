import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClassroomMember, MembershipStatus } from '@kid-elearning/types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ClassRealtimeGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join_room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string },
  ) {
    client.join(data.roomId);
    console.log(`Client ${client.id} joined room ${data.roomId}`);
    return { event: 'joined', roomId: data.roomId };
  }

  /**
   * Bắn thông báo tức thì tới phòng của Giáo viên khi có Học sinh mới xin vào lớp
   */
  notifyTeacherStudentJoined(classroomId: string, member: ClassroomMember) {
    if (this.server) {
      this.server.to(`class_${classroomId}`).emit('student_join_request', {
        message: `Học sinh ${member.studentName} vừa nhập mã xin vào lớp!`,
        member,
      });
    }
  }

  /**
   * Bắn thông báo kết quả duyệt trực tiếp về cho Học sinh
   */
  notifyStudentApprovalResult(studentId: string, status: MembershipStatus) {
    if (this.server) {
      this.server.to(`student_${studentId}`).emit('approval_result', {
        status,
        message:
          status === 'APPROVED'
            ? 'Chúc mừng! Thầy cô đã phê duyệt bạn vào lớp học!'
            : 'Yêu cầu tham gia lớp học của bạn đã bị từ chối.',
      });
    }
  }
}

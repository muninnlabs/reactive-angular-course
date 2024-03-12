import { AfterViewInit, Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as moment from "moment";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";
import { MessagesService } from "../services/messages.service";
import { LoadingService } from "./../services/loading.service";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;

  course: Course;

  constructor(
    private LoadingService: LoadingService,
    private mensageService: MessagesService,
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngAfterViewInit() {}

  save() {
    const changes = this.form.value;

    const saveCourse$ = this.coursesService
      .saveCourse(this.course.id, changes)
      .pipe(
        catchError((err) => {
          const message = "Could not save course";
          this.mensageService.showErrors(message);
          console.log(message, err);
          return throwError(err);
        })
      );

    this.LoadingService.showLoaderUntilCompleted(saveCourse$).subscribe((val) =>
      this.dialogRef.close(val)
    );
  }

  close() {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Lesson } from "../model/lesson";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "course",
  templateUrl: "./search-lessons.component.html",
  styleUrls: ["./search-lessons.component.css"],
})
export class SearchLessonsComponent implements OnInit {
  searchResults$: Observable<Lesson[]>;

  activeLesson: Lesson;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  onSearch(search: string) {
    this.searchResults$ = this.coursesService.searchLessons(search);
    this.activeLesson = null;
  }

  openLesson(lesson: Lesson) {
    this.activeLesson = lesson;
  }

  onBackSearch() {
    this.activeLesson = null;
  }
}

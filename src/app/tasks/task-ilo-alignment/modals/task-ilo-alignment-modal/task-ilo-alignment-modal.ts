// Import necessary Angular modules and dependencies
import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { alertService, projectService } from '../../../../ajs-upgraded-providers';
declare var angular: any;

// Service to handle the modal display
@Injectable({
  providedIn: 'root'
})

@Component({
    selector: 'app-task-ilo-alignment-modal',
    templateUrl: './task-ilo-alignment-modal.tpl.html' 
  })

  export class TaskILOAlignmentModalComponent {
    source: any;
    unit: any;
    task: any;
    ilo: any;
    alignment: any;
    project: any;
    editingRationale = false;
  
  
    constructor(
      public dialogRef: MatDialogRef<TaskILOAlignmentModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      @Inject(alertService) private AlertService: any,
    @Inject(projectService) private ProjectService: any,

  ) {
    this.source = data.source;
    this.unit = data.unit;
    this.task = data.task;
    this.ilo = data.ilo;
    this.alignment = data.alignment;
    this.project = data.project;
  }

  // Toggle editing rationale
  toggleEditRationale(): void {
    if (this.editingRationale) {
      this.updateAlignment();
    }
    this.editingRationale = !this.editingRationale;
  }

  // Remove an alignment item
  removeAlignmentItem(): void {
    const data = { ...this.alignment, unit_id: this.unit.id };
    // this.learningAlignments.delete(data).subscribe(
    //   () => {
    //     const indexToDelete = this.source.task_outcome_alignments.findIndex(
    //       (item: any) => item.id === this.alignment.id
    //     );
    //     this.source.task_outcome_alignments.splice(indexToDelete, 1);
    //     this.alignment = undefined;
    //     // Broadcast update event
    //   },
    //   (error) => {
    //     if (error.error) {
    //       this.AlertService.add('danger', `Error: ${error.error}`, 6000);
    //     }
    //   }
    // );
  }

  // Update alignment data
  updateAlignment(): void {
    const data = { ...this.alignment, unit_id: this.unit.id };
    // this.learningAlignments.update(data).subscribe(
    //   (response) => {
    //     this.AlertService.add('success', 'Task - Outcome alignment rating saved', 2000);
    //     // Broadcast update event
    //   },
    //   (error) => {
    //     if (error.error) {
    //       this.AlertService.add('danger', `Error: ${error.error}`, 6000);
    //     }
    //   }
    // );
  }

  // Add a new alignment
  addAlignment(): void {
    const data = {
      unit_id: this.unit.id,
      learning_outcome_id: this.ilo.id,
      task_definition_id: this.task.definition.id,
      rating: this.alignment.rating,
      description: null
    };

    if (this.project) {
      data['project_id'] = this.project.project_id;
    }

    // this.learningAlignments.create(data).subscribe(
    //   (response) => {
    //     this.alignment.id = response.id;
    //     this.source.task_outcome_alignments.push(this.alignment);
    //     // Broadcast create event
    //   },
    //   (error) => {
    //     if (error.error) {
    //       this.AlertService.add('danger', `Error: ${error.error}`, 6000);
    //     }
    //   }
    // );
  }

  // Update rating or add a new alignment
  updateRating(alignment: any): void {
    if (!this.alignment.id) {
      this.addAlignment();
    } else {
      this.updateAlignment();
    }
  }

  // Close the modal
  closeModal(): void {
    if (this.editingRationale) {
      this.updateRating(this.alignment);
    }
    this.dialogRef.close(this.alignment);
  }
}

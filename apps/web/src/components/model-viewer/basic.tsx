import React from "react";
import { useEffect, useRef } from "react";

export function Basic3DViewer({
  file,
  url,
}: {
  file: File | null;
  url: string | null;
}) {
  const parentDiv = useRef<HTMLDivElement>(null);
  // However, this really attaches the canvas element to the parentDiv, we need to also keep a reference for the viewer object itself which we'll do with viewerRef
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    import("online-3d-viewer").then((OV) => {
      if (!parentDiv.current) return;
      // If there is a file passed in that isn't null, instantiate the viewer object
      if (file) {
        // Set the location of the libraries needed to load different models to lib, which in nextjs will point to "/public/libs"
        OV.SetExternalLibLocation(`${window.origin}/libs`);
        // Initialise all the 3D viewer elements
        OV.Init3DViewerElements(console.log);
        // Before initialising the viewer, check that there isn't already a viewer object attached to viewerRef
        if (viewerRef.current === null) {
          // This is fairly self explanatory, initialise the viewer object with reasonable defaults. See the documentation for this component to see what other options you have
          const posFactor = 2;
          let viewer = new OV.EmbeddedViewer(parentDiv.current, {
            camera: new OV.Camera(
              new OV.Coord3D(
                -150.0 * posFactor,
                200.0 * posFactor,
                300.0 * posFactor,
              ),
              new OV.Coord3D(0.0, 0.0, 0.0),
              new OV.Coord3D(0.0, 1.0, 0.0),
              45.0,
            ),
            backgroundColor: new OV.RGBAColor(255, 255, 255, 255),
            defaultColor: new OV.RGBColor(0, 100, 100),
            // edgeSettings: {
            //   showEdges: false,
            //   edgeThreshold: 1,
            // },
            // environmentMap: [
            //   "../website/assets/envmaps/grayclouds/posx.jpg",
            //   "../website/assets/envmaps/grayclouds/negx.jpg",
            //   "../website/assets/envmaps/grayclouds/posy.jpg",
            //   "../website/assets/envmaps/grayclouds/negy.jpg",
            //   "../website/assets/envmaps/grayclouds/posz.jpg",
            //   "../website/assets/envmaps/grayclouds/negz.jpg",
            // ],
            onModelLoaded: () => {},
          });
          // ! This feels stupid but unfortunately, this resizing event can persist after clean up and lead to an error, one way to avoid this happening is to just overwrite the method so that it doesn't call this.viewer
          // ! Ideally, you'd clean it up during cleanup but I just found it easier to replace and ignore this event instead
          viewer.Resize = () => {
            console.log("I'm not resizing");
          };

          // Here, we assign the viewer object viewerRef.current to keep hold of it for later use
          (viewerRef.current as any) = viewer;

          // I've found This method of loading the file into the viewer works most reliably
          // Create a new data transfer object, add a File interface to it's items, grab the files and assign them to file_list and then load the model into the viewer with them
          if (file) {
            loadFile(file);
          }
          if (url) {
            loadUrl(url);
          }
        }
      }
    });
    return () => {
      // ! We need to correctly clean up our viewer, it's listeners and related model data to ensure memory leaks don't occur
      // ! If you want to see what can happen if this isn't here, comment out this code and repeatedly spin up multiple viewers and then do a heap snapshot with chrome and you will see a massive amount of data that isn't being cleaned up by the garbage collector
      // We first check that both the viewerRef and parentDiv aren't null so we don't call a method on an object that doesn't exist
      if (viewerRef.current !== null && parentDiv.current !== null) {
        // ! I threw the kitchen sink at this to get rid of the memory leaks so some of this code is definitely redundant and there is likely a cleaner way of doing this
        // We delete the model, reset the state of the renderer and clear the viewer
        delete (viewerRef.current as any).model;
        (viewerRef.current as any).viewer.renderer.resetState();
        (viewerRef.current as any).viewer.Clear();
        // Then we delete the whole viewer object
        delete (viewerRef.current as any).viewer;
        // We grab canvas element before we delete it to ensure we lose the webgl context and it doesn't persist
        const gl = (viewerRef.current as any).canvas.getContext("webgl2");
        gl.getExtension("WEBGL_lose_context").loseContext();
        // We replace the canvas element which will also replace all the event listeners which can cause the element and things associated with it to not be correctly cleaned up by the garbage collector
        const tempClone = (viewerRef.current as any).canvas.cloneNode(true);
        (viewerRef.current as any).canvas.parentNode.replaceChild(
          tempClone,
          (viewerRef.current as any).canvas,
        );
        // Finally, we delete the canvas element and set the viewerRef.current to null, meaning everything should be properly cleaned up
        parentDiv.current.removeChild(parentDiv.current.children[0]!);
        (viewerRef as any).current = null;
      }
    };
  }, []);

  function loadFile(file: File) {
    if (!file) return;
    if (!viewerRef.current) return;
    const viewer = viewerRef.current as any;
    if (!viewer) return;
    var dt = new DataTransfer();
    dt.items.add(file);
    var file_list = dt.files;
    console.log(viewer);
    viewer.LoadModelFromFileList([...file_list]);
  }

  function loadUrl(url: string) {
    if (!url) return;
    if (!viewerRef.current) return;
    const viewer = viewerRef.current as any;
    if (!viewer) return;
    viewer.LoadModelFromURL(url);
  }

  useEffect(() => {
    if (!file) return;
    loadFile(file);
  }, [file]);

  useEffect(() => {
    if (!url) return;
    loadUrl(url);
  }, [url]);

  return (
    <>
      <div
        ref={parentDiv}
        role={"img"}
        aria-label="Canvas showing the model in the 3D Viewer"
        className="h-full w-full"
      ></div>
    </>
  );
}
